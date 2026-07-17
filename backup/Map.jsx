import { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Building2, TrendingUp, Heart, Star, Play, Pause } from "lucide-react";
import * as echarts from 'echarts';

const BAGMATI_DISTRICTS = [
    'KATHMANDU',
    'LALITPUR',
    'BHAKTAPUR',
    'KAVRE',
    'SINDHUPALCHOK',
    'RASUWA',
    'NUWAKOT',
    'DHADING',
    'CHITWAN',
    'MAKWANPUR',
    'SINDHULI',
    'RAMECHHAP',
    'DOLAKHA'
];

// Memphis-style accent palette, pulled from the brand illustration
const MEMPHIS = {
    purple: '#6C5CE7',   // selected / active state
    orange: '#FF6B35',   // heatmap base + inactive pins
    pink: '#F4A6C8',
    yellow: '#FFC94D',
    green: '#3F9142'
};

const TESTIMONIALS = {
    'Kathmandu': {
        name: 'Sofia Joshi',
        role: 'Head of Product, Kathmandu Tech',
        location: 'Kathmandu, Bagmati Province',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces',
        clients: 18,
        quote: "Clean design and fast execution. Their technical depth helped us scale our production pipelines efficiently.",
        stars: 5,
        coord: [85.34, 27.75],
        mapFeature: 'Kathmandu'
    },
    'Chitwan': {
        name: 'Anjali Gurung',
        role: 'Managing Director, Lakeshore Tourism',
        location: 'Chitwan, Bagmati Province',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
        clients: 8,
        quote: "Working with Velocit has streamlined our booking systems. They transformed our digital presence completely.",
        stars: 5,
        coord: [84.4017, 27.5736],
        mapFeature: 'Chitwan'
    },
    'Sindhuli': {
        name: 'Karan Chaudhary',
        role: 'Founder, Sudur Agriculture',
        location: 'Sindhuli, Bagmati Province',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
        clients: 5,
        quote: "Highly competent team that brought modern software architecture to our logistics platforms. Invaluable partnership.",
        stars: 5,
        coord: [86.24, 27.02],
        mapFeature: 'Sindhuli'
    },
    'Dolakha': {
        name: 'Manish Prasad',
        role: 'Logistics Manager, Dolakha Hydro',
        location: 'Dolakha, Bagmati Province',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
        clients: 6,
        quote: "Velocit delivered robust tracking systems that operate flawlessly in real-time. Absolutely top tier.",
        stars: 5,
        coord: [86.16, 28.04],
        mapFeature: 'Dolakha'
    }
};

const DISTRICT_LIST = ['Chitwan', 'Dolakha', 'Kathmandu', 'Sindhuli'];

const DISTRICT_STATS = {
    'Kathmandu': {
        clients: 18,
        avgRating: '4.8',
        growthRate: '92%',
        satisfaction: '4.8 / 5',
        avatars: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
        ]
    },
    'Chitwan': {
        clients: 8,
        avgRating: '4.7',
        growthRate: '88%',
        satisfaction: '4.7 / 5',
        avatars: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces'
        ]
    },
    'Sindhuli': {
        clients: 5,
        avgRating: '4.6',
        growthRate: '84%',
        satisfaction: '4.6 / 5',
        avatars: [
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
        ]
    },
    'Dolakha': {
        clients: 6,
        avgRating: '4.9',
        growthRate: '95%',
        satisfaction: '4.9 / 5',
        avatars: [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
        ]
    }
};

const KEY_TO_MAP_FEATURE = {
    'Chitwan': 'Chitwan',
    'Sindhuli': 'Sindhuli',
    'Dolakha': 'Dolakha',
    'Kathmandu': 'Kathmandu'
};

const capitalizeName = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const HEATMAP_OPACITY_TIERS = [0.18, 0.36, 0.54, 0.75]; // low -> high

const buildHeatmapData = (active) => {
    const ranked = [...DISTRICT_LIST].sort(
        (a, b) => TESTIMONIALS[a].clients - TESTIMONIALS[b].clients
    );
    const [r, g, b] = [255, 107, 53]; // MEMPHIS.orange as rgb

    return BAGMATI_DISTRICTS.map((rawName) => {
        const d = capitalizeName(rawName);
        const isInteractive = DISTRICT_LIST.includes(d);

        let areaColor = '#E1ECFD';
        let borderColor = '#0066FF';

        if (isInteractive) {
            const rankedIndex = ranked.indexOf(d);
            const opacity = HEATMAP_OPACITY_TIERS[rankedIndex] ?? HEATMAP_OPACITY_TIERS[HEATMAP_OPACITY_TIERS.length - 1];
            areaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }

        if (d === active) {
            areaColor = MEMPHIS.purple;
            borderColor = MEMPHIS.purple;
        }

        return {
            name: d,
            itemStyle: { 
                areaColor,
                borderColor
            }
        };
    });
};

const PinMarker = ({ active, color }) => (
    <svg width={active ? 26 : 20} height={active ? 34 : 26} viewBox="0 0 24 32" fill="none">
        <path
            d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
            fill={color}
            stroke="white"
            strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="4.2" fill="white" />
    </svg>
);

export default function Philosophy() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const containerRef = useRef(null);
    const positions = {
        Kathmandu: { cardX: -39, cardY: -109, cx: 414, cy: 154, bendX: 584, bendY: 154 },
        Chitwan: { cardX: -71, cardY: 138, cx: 371, cy: 403, bendX: 477, bendY: 402 },
        Dolakha: { cardX: 7, cardY: -122, cx: 391, cy: 187, bendX: 535, bendY: 186 },
        Sindhuli: { cardX: -69, cardY: 96, cx: 319, cy: 358, bendX: 456, bendY: 358 }
    };
    const [activeDistrict, setActiveDistrict] = useState('Kathmandu');
    const [containerWidth, setContainerWidth] = useState(1024);

    const [pinPositions, setPinPositions] = useState({
        Kathmandu: { x: 656, y: 529 },
        Chitwan: { x: 512, y: 554 },
        Sindhuli: { x: 729, y: 648 },
        Dolakha: { x: 656, y: 431 }
    });

    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        let chartInstance = null;

        fetch('/nepal-districts.geojson')
            .then((res) => res.json())
            .then((geoJson) => {
                if (!chartRef.current) return;

                const bagmatiFeatures = geoJson.features
                    .filter((f) => {
                        const districtName = f.properties?.DISTRICT;
                        return districtName && BAGMATI_DISTRICTS.includes(districtName.toUpperCase());
                    })
                    .map((f) => ({
                        ...f,
                        properties: {
                            ...f.properties,
                            name: capitalizeName(f.properties.DISTRICT)
                        }
                    }));

                const bagmatiGeoJson = {
                    ...geoJson,
                    features: bagmatiFeatures
                };

                echarts.registerMap('bagmati', bagmatiGeoJson);

                chartInstance = echarts.init(chartRef.current);
                chartInstanceRef.current = chartInstance;

                const option = {
                    tooltip: {
                        show: false
                    },
                    series: [
                        {
                            name: 'Bagmati Province Map',
                            type: 'map',
                            map: 'bagmati',
                            roam: false,
                            layoutCenter: ['50%', '50%'],
                            layoutSize: '86%',
                            selectedMode: 'single',
                            label: {
                                show: false,
                                emphasis: { show: false }
                            },
                            itemStyle: {
                                areaColor: '#E1ECFD',
                                borderColor: '#0066FF',
                                borderWidth: 1.2,
                                borderType: 'solid'
                            },
                            emphasis: {
                                itemStyle: {
                                    areaColor: 'rgba(108, 92, 231, 0.35)'
                                }
                            },
                            select: {
                                itemStyle: {
                                    areaColor: MEMPHIS.purple,
                                    borderColor: MEMPHIS.purple,
                                    borderWidth: 1.5
                                }
                            },
                            data: buildHeatmapData('Kathmandu')
                        }
                    ]
                };

                chartInstance.setOption(option);

                const defaultFeature = KEY_TO_MAP_FEATURE[activeDistrict];
                chartInstance.dispatchAction({
                    type: 'select',
                    seriesIndex: 0,
                    name: defaultFeature
                });

                const updatePositions = () => {
                    if (!chartInstance || !chartRef.current || !containerRef.current) return;
                    const rect = chartRef.current.getBoundingClientRect();
                    const parentRect = containerRef.current.getBoundingClientRect();
                    const offsetX = rect.left - parentRect.left;
                    const offsetY = rect.top - parentRect.top;

                    const kat = chartInstance.convertToPixel({ seriesIndex: 0 }, TESTIMONIALS.Kathmandu.coord);
                    const chi = chartInstance.convertToPixel({ seriesIndex: 0 }, TESTIMONIALS.Chitwan.coord);
                    const sin = chartInstance.convertToPixel({ seriesIndex: 0 }, TESTIMONIALS.Sindhuli.coord);
                    const dol = chartInstance.convertToPixel({ seriesIndex: 0 }, TESTIMONIALS.Dolakha.coord);

                    if (kat && chi && sin && dol) {
                        setPinPositions(prev => ({
                            Kathmandu: prev.Kathmandu || { x: kat[0] + offsetX, y: kat[1] + offsetY },
                            Chitwan: prev.Chitwan || { x: chi[0] + offsetX, y: chi[1] + offsetY },
                            Sindhuli: prev.Sindhuli || { x: sin[0] + offsetX, y: sin[1] + offsetY },
                            Dolakha: prev.Dolakha || { x: dol[0] + offsetX, y: dol[1] + offsetY }
                        }));
                    }
                };

                chartInstance.on('finished', () => {
                    updatePositions();
                });

                chartInstance.on('click', (params) => {
                    if (params.name && DISTRICT_LIST.includes(params.name)) {
                        setActiveDistrict(params.name);
                    }
                });
            })
            .catch((err) => {
                console.error('Failed to load map data:', err);
            });

        const handleResize = () => {
            if (chartInstance && chartRef.current && containerRef.current) {
                chartInstance.resize();
                const rect = chartRef.current.getBoundingClientRect();
                const parentRect = containerRef.current.getBoundingClientRect();
                const offsetX = rect.left - parentRect.left;
                const offsetY = rect.top - parentRect.top;

                const kat = chartInstance.convertToPixel({ seriesIndex: 0 }, TESTIMONIALS.Kathmandu.coord);
                const chi = chartInstance.convertToPixel({ seriesIndex: 0 }, TESTIMONIALS.Chitwan.coord);
                const sin = chartInstance.convertToPixel({ seriesIndex: 0 }, TESTIMONIALS.Sindhuli.coord);
                const dol = chartInstance.convertToPixel({ seriesIndex: 0 }, TESTIMONIALS.Dolakha.coord);

                if (kat && chi && sin && dol) {
                    setPinPositions(prev => ({
                        Kathmandu: prev.Kathmandu || { x: kat[0] + offsetX, y: kat[1] + offsetY },
                        Chitwan: prev.Chitwan || { x: chi[0] + offsetX, y: chi[1] + offsetY },
                        Sindhuli: prev.Sindhuli || { x: sin[0] + offsetX, y: sin[1] + offsetY },
                        Dolakha: prev.Dolakha || { x: dol[0] + offsetX, y: dol[1] + offsetY }
                    }));
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartInstance) {
                chartInstance.dispose();
            }
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.setOption({
                series: [
                    {
                        itemStyle: {
                            areaColor: '#E1ECFD',
                            borderColor: '#0066FF'
                        },
                        data: buildHeatmapData(activeDistrict)
                    }
                ]
            });

            DISTRICT_LIST.forEach((d) => {
                chartInstanceRef.current.dispatchAction({
                    type: 'unselect',
                    seriesIndex: 0,
                    name: KEY_TO_MAP_FEATURE[d]
                });
            });
            if (activeDistrict) {
                chartInstanceRef.current.dispatchAction({
                    type: 'select', seriesIndex: 0,
                    name: KEY_TO_MAP_FEATURE[activeDistrict]
                });
            }
        }
    }, [activeDistrict]);



    const isLargeScreen = containerWidth >= 1024;

    // Define positions of the cards on the sides when on large screens (calculated dynamically)
    const cardPositions = {
        'Kathmandu': { 
            cx: positions.Kathmandu.cx, 
            cy: positions.Kathmandu.cy, 
            bendX: positions.Kathmandu.bendX,
            bendY: positions.Kathmandu.bendY,
            top: `${positions.Kathmandu.cardY}px`, 
            left: `${positions.Kathmandu.cardX}px` 
        },
        'Chitwan': { 
            cx: positions.Chitwan.cx, 
            cy: positions.Chitwan.cy, 
            bendX: positions.Chitwan.bendX,
            bendY: positions.Chitwan.bendY,
            top: `${positions.Chitwan.cardY}px`, 
            left: `${positions.Chitwan.cardX}px` 
        },
        'Dolakha': { 
            cx: containerWidth - positions.Dolakha.cx, 
            cy: positions.Dolakha.cy, 
            bendX: containerWidth - positions.Dolakha.bendX,
            bendY: positions.Dolakha.bendY,
            top: `${positions.Dolakha.cardY}px`, 
            right: `${positions.Dolakha.cardX}px` 
        },
        'Sindhuli': { 
            cx: containerWidth - positions.Sindhuli.cx, 
            cy: positions.Sindhuli.cy, 
            bendX: containerWidth - positions.Sindhuli.bendX,
            bendY: positions.Sindhuli.bendY,
            top: `${positions.Sindhuli.cardY}px`, 
            right: `${positions.Sindhuli.cardX}px` 
        }
    };

    const renderCard = (name) => {
        const data = TESTIMONIALS[name];
        const stats = DISTRICT_STATS[name];
        const isActive = activeDistrict === name;

        // Business/team background image for the left side
        const districtThumbnails = {
            'Kathmandu': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
            'Chitwan': 'https://images.unsplash.com/photo-1556761175-b8130581f576?w=200&h=200&fit=crop',
            'Sindhuli': 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=200&h=200&fit=crop',
            'Dolakha': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop'
        };

        const thumbnail = districtThumbnails[name] || districtThumbnails['Kathmandu'];

        return (
            <div
                key={name}
                onClick={() => setActiveDistrict(name)}
                className={`w-[420px] bg-white border border-gray-100/80 rounded-2xl p-4 flex gap-4 relative overflow-hidden select-none cursor-pointer transition-all duration-300 ${
                    isActive 
                        ? 'shadow-xl border-[#6C5CE7]/30 scale-[1.02]' 
                        : 'shadow-md hover:shadow-lg hover:-translate-y-0.5'
                }`}
            >
                {/* Left Side: Image */}
                <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] rounded-xl overflow-hidden relative shrink-0 group/thumb">
                    <img 
                        src={thumbnail} 
                        alt={`${name} Client Story`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                </div>

                {/* Right Side: Content */}
                <div className="flex flex-col flex-1 min-w-0 justify-between">
                    {/* Top Row: Badge & Rating */}
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                            Bagmati
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-gray-500">
                            <Star size={12} className="text-amber-400 fill-amber-400" />
                            <span className="font-bold text-gray-900">{stats?.avgRating || '4.8'}</span> / 5
                        </div>
                    </div>

                    {/* Middle Row: Avatars & Target Text */}
                    <div className="flex items-center gap-2 my-1.5">
                        <div className="flex -space-x-2 overflow-hidden shrink-0">
                            {stats?.avatars.slice(0, 3).map((url, i) => (
                                <img
                                    key={i}
                                    className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover border border-gray-100"
                                    src={url}
                                    alt="Client representative"
                                />
                            ))}
                            {stats && stats.clients > 3 && (
                                <div className="flex items-center justify-center h-7 w-7 rounded-full bg-violet-100 text-[#6C5CE7] font-semibold text-[9px] ring-2 ring-white z-10">
                                    {stats.clients}+
                                </div>
                            )}
                        </div>
                        <p className="text-[10px] leading-tight text-gray-600 font-medium truncate">
                            Trusted by Founders, CEOs, Product Teams.
                        </p>
                    </div>

                    {/* Bottom Row: Play Button, Client Story Text, Link */}
                    <div className="flex items-center justify-between gap-1 mt-1">
                        <div className="flex items-center gap-2 min-w-0">
                            <button
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                            >
                                <Play size={12} className="fill-current text-white ml-0.5" />
                            </button>
                            <div className="flex flex-col text-left min-w-0">
                                <span className="text-xs font-bold text-gray-900 leading-tight">
                                    Client Story
                                </span>
                                <span className="text-[10px] text-gray-500 truncate leading-tight">
                                    See how we helped businesses grow.
                                </span>
                            </div>
                        </div>

                        <span className="text-[11px] font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap flex items-center gap-0.5 shrink-0">
                            Watch Now <ArrowRight size={11} className="stroke-[2.5]" />
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section
            id="philosophy"
            className=" px-8 py-12 sm:p-12"
        >
            <div className="mx-auto w-full max-w-7xl">
                {/* Map Section Container */}
                <div ref={containerRef} className="w-full relative min-h-[650px] lg:min-h-[820px] p-4 sm:p-6 lg:p-8">
                    
                    {/* SVG Connector Lines (Large Screens Only) */}
                    {isLargeScreen && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                             {DISTRICT_LIST.map((name) => {
                                const pinPos = pinPositions[name];
                                const cardPos = cardPositions[name];
                                if (!pinPos || !cardPos) return null;
                                
                                const bendX = cardPos.bendX;
                                const bendY = cardPos.bendY;

                                return (
                                    <g key={name}>
                                        {/* Connector line path */}
                                        <path
                                            d={`M ${pinPos.x} ${pinPos.y} L ${bendX} ${bendY} L ${cardPos.cx} ${cardPos.cy}`}
                                            fill="none"
                                            stroke="#111827"
                                            strokeWidth="1.5"
                                            strokeDasharray="4 4"
                                        />
                                        {/* Small decorative dot at the pin connection point */}
                                        <circle 
                                            cx={pinPos.x} 
                                            cy={pinPos.y} 
                                            r="3.5" 
                                            fill="#111827" 
                                        />

                                    </g>
                                );
                            })}
                        </svg>
                    )}

                    {/* Absolute Map Pins overlaying directly on map */}
                    {Object.entries(pinPositions).map(([name, pos]) => {
                        if (!pos) return null;
                        const isActive = activeDistrict === name;
                        return (
                            <div
                                key={name}
                                style={{
                                    position: 'absolute',
                                    left: `${pos.x}px`,
                                    top: `${pos.y}px`,
                                    transform: 'translate(-50%, -100%)',
                                    zIndex: 30,
                                }}
                                className="flex flex-col items-center pointer-events-auto cursor-pointer"
                                onClick={() => setActiveDistrict(name)}
                            >
                                <PinMarker active={isActive} color={isActive ? MEMPHIS.purple : MEMPHIS.orange} />
                            </div>
                        );
                    })}

                    {/* Desktop Layout: Map in Center, Cards Pinned on Left/Right Sides */}
                    {isLargeScreen ? (
                        <div className="w-full h-[780px] relative">
                            {/* Cards on Left Side */}
                            <div className="absolute" style={{ top: cardPositions['Kathmandu'].top, left: cardPositions['Kathmandu'].left }}>
                                {renderCard('Kathmandu')}
                            </div>
                            <div className="absolute" style={{ top: cardPositions['Chitwan'].top, left: cardPositions['Chitwan'].left }}>
                                {renderCard('Chitwan')}
                            </div>

                            {/* Center Map */}
                            <div className="mx-auto w-full h-[720px] mt-40">
                                <div ref={chartRef} className="w-full h-full" />
                            </div>

                            {/* Cards on Right Side */}
                            <div className="absolute" style={{ top: cardPositions['Dolakha'].top, right: cardPositions['Dolakha'].right }}>
                                {renderCard('Dolakha')}
                            </div>
                            <div className="absolute" style={{ top: cardPositions['Sindhuli'].top, right: cardPositions['Sindhuli'].right }}>
                                {renderCard('Sindhuli')}
                            </div>
                        </div>
                    ) : (
                        /* Mobile/Tablet Layout: Map on top, Cards in grid below */
                        <div className="flex flex-col gap-6">
                            <div className="w-full aspect-[1.2/1] min-h-[300px] relative">
                                <div ref={chartRef} className="w-full h-full" />
                            </div>
                            
                            {/* Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center mt-4">
                                {DISTRICT_LIST.map((name) => renderCard(name))}
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </section>
    );
}