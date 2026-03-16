/**
 * India District Circle Map - Sparrow Trust India
 * Shows district-wise colored circles on India map
 * Uses Leaflet + SheetJS for Excel data
 */

document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map', {
        center: [12.5, 78.5],
        zoom: 6,
        scrollWheelZoom: false,
        dragging: true,
        zoomControl: true,
        minZoom: 4,
        maxZoom: 10
    });

    // Clean light tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19
    }).addTo(map);

    // Load data and add circles
    loadCircleData(map);
});

// Color based on count (matching reference image)
function getColor(count) {
    if (count <= 1) return '#a8d8ea';   // light blue
    if (count <= 30) return '#f5a623';  // orange
    if (count <= 50) return '#e8601c';  // dark orange
    return '#c0392b';                   // red
}

// Circle radius based on count
function getRadius(count) {
    if (count <= 1) return 8;
    if (count <= 30) return 12;
    if (count <= 50) return 16;
    return 20;
}

// Add legend
function addLegend(map) {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'circle-legend');
        div.innerHTML = `
            <div style="background:rgba(255,255,255,0.95);padding:12px 16px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.15);font-family:'Open Sans',sans-serif;">
                <h4 style="margin:0 0 8px;font-size:14px;font-weight:700;color:#333;">Color Scale</h4>
                <div style="display:flex;align-items:center;margin:5px 0;"><span style="display:inline-block;width:16px;height:16px;background:#a8d8ea;border-radius:50%;margin-right:8px;border:2px solid rgba(0,0,0,0.2);"></span><span style="font-size:12px;color:#555;">Only 1 case</span></div>
                <div style="display:flex;align-items:center;margin:5px 0;"><span style="display:inline-block;width:20px;height:20px;background:#f5a623;border-radius:50%;margin-right:8px;border:2px solid rgba(0,0,0,0.2);"></span><span style="font-size:12px;color:#555;">2-30 cases</span></div>
                <div style="display:flex;align-items:center;margin:5px 0;"><span style="display:inline-block;width:24px;height:24px;background:#e8601c;border-radius:50%;margin-right:8px;border:2px solid rgba(0,0,0,0.2);"></span><span style="font-size:12px;color:#555;">31-50 cases</span></div>
                <div style="display:flex;align-items:center;margin:5px 0;"><span style="display:inline-block;width:28px;height:28px;background:#c0392b;border-radius:50%;margin-right:8px;border:2px solid rgba(0,0,0,0.2);"></span><span style="font-size:12px;color:#555;">51-100 cases</span></div>
            </div>
        `;
        return div;
    };
    legend.addTo(map);
}

async function loadCircleData(map) {
    try {
        const response = await fetch('./assets/data/heap-map.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        const firstRow = rows[0] || {};
        const hasLatLng = (firstRow.lat || firstRow.Lat || firstRow.Latitude) &&
                          (firstRow.lng || firstRow.Lng || firstRow.Longitude || firstRow.lon);

        if (hasLatLng) {
            // Group by approximate location (district-level grouping)
            const grouped = {};
            rows.forEach(row => {
                const lat = parseFloat(row.lat || row.Lat || row.LAT || row.Latitude || row.LATITUDE);
                const lng = parseFloat(row.lng || row.Lng || row.LNG || row.Longitude || row.LONGITUDE || row.lon || row.Lon);
                const district = row.district || row.District || row.DISTRICT || row.city || row.City || row.place || row.Place || '';
                if (!isNaN(lat) && !isNaN(lng)) {
                    // Round to ~0.5 degree for grouping nearby points
                    const key = district || (Math.round(lat * 2) / 2) + ',' + (Math.round(lng * 2) / 2);
                    if (!grouped[key]) {
                        grouped[key] = { lat: 0, lng: 0, count: 0, name: district };
                    }
                    grouped[key].lat += lat;
                    grouped[key].lng += lng;
                    grouped[key].count += 1;
                }
            });

            // Add circle markers
            Object.values(grouped).forEach(g => {
                const avgLat = g.lat / g.count;
                const avgLng = g.lng / g.count;
                const color = getColor(g.count);
                const radius = getRadius(g.count);

                L.circleMarker([avgLat, avgLng], {
                    radius: radius,
                    fillColor: color,
                    color: 'rgba(0,0,0,0.3)',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.85
                })
                .bindPopup(`<strong>${g.name || 'Location'}</strong><br>Activities: ${g.count}`)
                .addTo(map);
            });
        } else {
            // If data has district/state with counts
            rows.forEach(row => {
                const lat = parseFloat(row.lat || row.Lat || row.Latitude || 0);
                const lng = parseFloat(row.lng || row.Lng || row.Longitude || row.lon || 0);
                const count = parseFloat(row.count || row.Count || row.cases || row.Cases || row.value || 1);
                const name = row.district || row.District || row.state || row.State || row.place || row.Place || '';

                if (lat && lng) {
                    const color = getColor(count);
                    const radius = getRadius(count);
                    L.circleMarker([lat, lng], {
                        radius: radius,
                        fillColor: color,
                        color: 'rgba(0,0,0,0.3)',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.85
                    })
                    .bindPopup(`<strong>${name || 'Location'}</strong><br>Activities: ${count}`)
                    .addTo(map);
                }
            });
        }

        // Add legend
        addLegend(map);

    } catch (error) {
        console.error('Error loading circle data:', error);
    }
}
