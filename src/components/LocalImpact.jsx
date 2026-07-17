import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Building2,
  Users,
  TrendingUp,
  Target,
  Star,
  Play,
  Pause,
  ArrowRight,
  Phone,
  ChevronDown,
  ChevronRight
} from "lucide-react";
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

const COVERED_DISTRICTS = ['BHAKTAPUR', 'LALITPUR', 'SINDHULI', 'CHITWAN'];

const PRESENCE_WEIGHT = {
  'LALITPUR': 0.8,
  'BHAKTAPUR': 0.55,
  'CHITWAN': 0.45,
  'SINDHULI': 0.35
};

const BRAND_RGB = '0, 102, 255';
const PRESENCE_RGB = '0, 102, 255';

const DISTRICT_DATA = {
  'Bhaktapur': {
    status: 'Presence',
    badgeColor: 'bg-blue-50 text-blue-600 border border-blue-200',
    description: 'Heritage tourism and local craft businesses going digital',
    coordinates: [85.45, 27.6],
    stats: {
      businesses: '90+',
      satisfaction: '97%',
      rating: '4.8/5',
      projects: '14+'
    },
    story: {
      name: 'Bhaktapur Pottery Collective',
      category: 'Bhaktapur',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
      video: '/saas.mp4',
      description: 'Grew direct-to-tourist and export sales by 180% with an online storefront.',
      rating: '4.8',
      review: {
        quote: 'Velocit Labs transformed our entire operational workflow.',
        business: 'Bhaktapur Pottery Collective',
        location: 'Bhaktapur, Nepal'
      },
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop'
      ]
    },
    services: ['Growth Strategy', 'Performance Marketing', 'Branding', 'Web Development', 'Analytics & Reporting']
  },
  'Lalitpur': {
    status: 'Presence',
    badgeColor: 'bg-blue-50 text-blue-600 border border-blue-200',
    description: 'Hub for design innovations and creative startups',
    coordinates: [85.328, 27.45],
    stats: {
      businesses: '150+',
      satisfaction: '97%',
      rating: '4.8/5',
      projects: '18+'
    },
    story: {
      name: 'Crafts Nepal',
      category: 'Lalitpur',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&h=300&fit=crop',
      video: '/temp.mp4',
      description: 'Scaled handmade product exports globally by 140% using digital automation.',
      rating: '4.9',
      review: {
        quote: 'Our exports doubled within months — the best digital partner we have worked with.',
        business: 'Crafts Nepal Exports Ltd.',
        location: 'Lalitpur, Nepal'
      },
      avatars: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop'
      ]
    },
    services: ['E-commerce Development', 'Product Design', 'Global SEO', 'Cloud Migration']
  },
  'Chitwan': {
    status: 'Presence',
    badgeColor: 'bg-blue-50 text-blue-600 border border-blue-200',
    description: 'Rapidly expanding tech integration in tourism and hospitality',
    coordinates: [84.48, 27.52],
    stats: {
      businesses: '85+',
      satisfaction: '96%',
      rating: '4.7/5',
      projects: '12+'
    },
    story: {
      name: 'Lakeshore Travel & Lodge',
      category: 'Chitwan',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      video: '/saas.mp4',
      description: 'Implemented seamless reservation system reducing booking drop-offs by 45%.',
      rating: '4.8',
      review: {
        quote: 'Booking drop-offs fell by 45%. The system they built just works flawlessly.',
        business: 'Lakeshore Travel & Lodge',
        location: 'Chitwan, Nepal'
      },
      avatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop'
      ]
    },
    services: ['UI/UX Redesign', 'Custom Reservation Systems', 'Local SEO', 'CRM Integration']
  },
  'Sindhuli': {
    status: 'Presence',
    badgeColor: 'bg-blue-50 text-blue-600 border border-blue-200',
    description: 'Transforming local supply chains and agri-tech infrastructure',
    coordinates: [85.983, 27.12],
    stats: {
      businesses: '45+',
      satisfaction: '95%',
      rating: '4.6/5',
      projects: '8+'
    },
    story: {
      name: 'Sindhuli Organic Farm Hub',
      category: 'Sindhuli',
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=400&h=300&fit=crop',
      video: '/temp.mp4',
      description: 'Connected 500+ local farmers directly to wholesalers using custom portal.',
      rating: '4.7',
      review: {
        quote: 'Connecting our farmers to wholesalers was seamless. A game changer for our region.',
        business: 'Sindhuli Organic Farm Hub',
        location: 'Sindhuli, Nepal'
      },
      avatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
        'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=80&h=80&fit=crop'
      ]
    },
    services: ['B2B Portal Development', 'Supply Chain Tech', 'Mobile App Development']
  }
};

const capitalizeName = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getDistrictItemStyle = (rawName, isSelected) => {
  const upper = (rawName || '').toUpperCase();

  if (!COVERED_DISTRICTS.includes(upper)) {
    return {
      areaColor: '#F1F5F9',
      borderColor: '#CBD5E1',
      borderWidth: isSelected ? 1.5 : 1
    };
  }

  const weight = PRESENCE_WEIGHT[upper] ?? 0.4;
  const alpha = isSelected ? 0.95 : weight;
  const borderAlpha = isSelected ? 1 : Math.min(weight + 0.2, 1);

  return {
    areaColor: `rgba(${PRESENCE_RGB}, ${alpha})`,
    borderColor: `rgba(${PRESENCE_RGB}, ${borderAlpha})`,
    borderWidth: isSelected ? 2 : 1.25
  };
};

const STORY_TRANSITION_MS = 550;

export default function LocalImpact() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const containerRef = useRef(null);
  const rightPanelRef = useRef(null);
  const statCardRef = useRef(null);
  const geoJsonFeaturesRef = useRef([]);

  const [selectedDistrict, setSelectedDistrict] = useState('Lalitpur');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [pinPixelPos, setPinPixelPos] = useState(null);
  const [targetPixelPos, setTargetPixelPos] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);
  const storyVideoRef = useRef(null);
  const [isStoryPlaying, setIsStoryPlaying] = useState(true);

  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const [displayedDistrict, setDisplayedDistrict] = useState('Lalitpur');
  const isFirstRender = useRef(true);

  useEffect(() => {
    setIsStoryPlaying(true);
  }, [displayedDistrict]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsStoryLoading(true);
    const timer = setTimeout(() => {
      setDisplayedDistrict(selectedDistrict);
      setIsStoryLoading(false);
    }, STORY_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [selectedDistrict]);

  const toggleStoryPlayback = (e) => {
    e.stopPropagation();
    const video = storyVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsStoryPlaying(true);
    } else {
      video.pause();
      setIsStoryPlaying(false);
    }
  };

  const handleZoomIn = () => {
    if (!chartInstanceRef.current) return;
    setMapZoom((prev) => {
      const next = prev * 1.25;
      chartInstanceRef.current.setOption({
        series: [{ zoom: next }]
      });
      return next;
    });
    setTimeout(updateConnectorCoordinates, 150);
  };

  const handleZoomOut = () => {
    if (!chartInstanceRef.current) return;
    setMapZoom((prev) => {
      const next = Math.max(1, prev / 1.25);
      chartInstanceRef.current.setOption({
        series: [{ zoom: next }]
      });
      return next;
    });
    setTimeout(updateConnectorCoordinates, 150);
  };

  useEffect(() => {
    let chartInstance = null;

    fetch('/nepal-districts.geojson')
      .then((res) => res.json())
      .then((geoJson) => {
        if (!chartRef.current) return;

        const bagmatiFeatures = (geoJson.features || [])
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

        geoJsonFeaturesRef.current = bagmatiFeatures;

        const bagmatiGeoJson = {
          ...geoJson,
          features: bagmatiFeatures
        };

        // Register custom map
        echarts.registerMap('nepal-districts', bagmatiGeoJson);

        chartInstance = echarts.init(chartRef.current);
        chartInstanceRef.current = chartInstance;

        const buildSeriesData = () => {
          return geoJsonFeaturesRef.current.map((feature) => {
            const name = feature.properties?.DISTRICT || '';
            const capName = capitalizeName(name);
            const isSelected = capName === selectedDistrict;

            return {
              name: capName,
              value: isSelected ? 1 : 0,
              itemStyle: getDistrictItemStyle(name, isSelected)
            };
          });
        };

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}',
            backgroundColor: '#ffffff',
            textStyle: { color: '#1F2937', fontSize: 12, fontWeight: '600' },
            borderWidth: 0,
            padding: [3, 8],
            shadowBlur: 0
          },
          series: [
            {
              name: 'Nepal Districts',
              type: 'map',
              map: 'nepal-districts',
              roam: false,
              layoutCenter: ['50%', '50%'],
              layoutSize: '100%',
              label: {
                show: false,
                emphasis: { show: false }
              },
              itemStyle: {
                shadowColor: 'rgba(15, 23, 42, 0.06)',
                shadowBlur: 4
              },
              emphasis: {
                focus: 'self',
                itemStyle: {
                  areaColor: '#DCEEFF',
                  borderWidth: 2,
                  borderColor: '#0066FF'
                }
              },
              select: {
                disabled: true
              },
              data: buildSeriesData()
            }
          ]
        };

        chartInstance.setOption(option);
        setChartLoaded(true);

        chartInstance.on('click', (params) => {
          const capName = capitalizeName(params.name);
          if (DISTRICT_DATA[capName]) {
            setSelectedDistrict(capName);
          }
        });
      })
      .catch((err) => {
        console.error('Failed to load Nepal geojson map:', err);
      });

    const handleResize = () => {
      if (chartInstance) {
        chartInstance.resize();
        updateConnectorCoordinates();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateConnectorCoordinates);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateConnectorCoordinates);
      if (chartInstance) {
        chartInstance.dispose();
      }
    };
  }, []);

  // Update map colors and pin positions when selection changes
  useEffect(() => {
    if (chartInstanceRef.current && chartLoaded && geoJsonFeaturesRef.current.length > 0) {
      const updatedData = geoJsonFeaturesRef.current.map((feature) => {
        const name = feature.properties?.DISTRICT || '';
        const capName = capitalizeName(name);
        const isSelected = capName === selectedDistrict;

        return {
          name: capName,
          value: isSelected ? 1 : 0,
          itemStyle: getDistrictItemStyle(name, isSelected)
        };
      });

      chartInstanceRef.current.setOption({
        series: [{
          data: updatedData
        }]
      });
    }

    // Delay slightly to ensure map rendering is fully finished before reading positions
    const timer = setTimeout(() => {
      updateConnectorCoordinates();
    }, 150);

    return () => clearTimeout(timer);
  }, [selectedDistrict, chartLoaded]);

  // Calculate coordinates for dynamic SVG curved connections
  const updateConnectorCoordinates = () => {
    if (!chartInstanceRef.current || !containerRef.current || !DISTRICT_DATA[selectedDistrict]) return;

    try {
      const coord = DISTRICT_DATA[selectedDistrict].coordinates;
      const pixel = chartInstanceRef.current.convertToPixel({ seriesIndex: 0 }, coord);

      if (!pixel) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const mapRect = chartRef.current.getBoundingClientRect();

      // Convert local coordinate offset relative to container
      const pinX = pixel[0] + (mapRect.left - containerRect.left);
      const pinY = pixel[1] + (mapRect.top - containerRect.top);
      setPinPixelPos({ x: pinX, y: pinY });
    } catch (e) {
      console.warn("ECharts not fully initialized for coordinate conversion", e);
    }
  };

  const activeData = DISTRICT_DATA[displayedDistrict] || DISTRICT_DATA['Lalitpur'];
  return (
    <section id="impact" className="w-full bg-white p-6 sm:p-10 lg:p-12 overflow-hidden">
      {/* Story card entrance animation (slowed down) + shimmer skeleton shown
          briefly on district change before the new card reveals itself. */}
      <style>{`
        @keyframes storyCardIn {
          from { opacity: 0; transform: translateX(18px) scale(0.98); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        .story-card-anim {
          animation: storyCardIn 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes shimmerSweep {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .shimmer-block {
          background: linear-gradient(90deg, #eef0f2 25%, #f8f9fa 37%, #eef0f2 63%);
          background-size: 800px 100%;
          animation: shimmerSweep 1.3s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div className="text-center w-full max-w-4xl mx-auto mb-10 md:mb-14">
        <span className="inline-block font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#0066FF] uppercase mb-3">
          Local Impact
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
          Growing footprint across Nepal.
        </h2>
        <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
          We partner with businesses nationwide, driving regional digital transformation.
        </p>
      </div>

      <div ref={containerRef} className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center relative">

        {/* LEFT COLUMN: Map & Headers */}
        <div className="flex flex-col justify-between">

          {/* Interactive Map Area */}
          <div className="relative w-full bg-linear-to-b from-[#f8f9fb] to-[#f1f3f6] shadow-3xl p-4 sm:p-5 lg:p-6">
            <div ref={chartRef} className="w-full aspect-[1.1/1] sm:aspect-[1.55/1] min-h-80 sm:min-h-70 lg:min-h-82.5 cursor-pointer" />

            {/* Absolute Pin Overlay — clean single-shape marker, no bulky circle wrapper */}
            {pinPixelPos && (
              <div
                style={{
                  position: 'absolute',
                  left: `${pinPixelPos.x}px`,
                  top: `${pinPixelPos.y}px`,
                  transform: 'translate(-50%, -100%)',
                  pointerEvents: 'none'
                }}
                className="flex flex-col items-center z-30"
              >
                <div className="relative flex items-end justify-center">
                  {/* Subtle pulse, sized to sit behind the pin's bulb only */}
                  <span className="absolute bottom-1.75 h-3.5 w-3.5 rounded-full bg-blue-400 opacity-50 animate-ping" />
                  <MapPin
                    size={30}
                    strokeWidth={1.75}
                    className="relative text-blue-700 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
                    fill="#0066FF"
                    stroke="white"
                  />
                </div>
                <div className="-mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm bg-blue-600 text-white">
                  {selectedDistrict}
                </div>
              </div>
            )}

            <div className="relative sm:absolute mt-4 sm:mt-0 sm:bottom-4 sm:left-4 bg-white/90 sm:backdrop-blur-sm rounded-md shadow-sm px-3.5 py-2.5 flex flex-row sm:flex-col justify-center sm:justify-start gap-4 sm:gap-1.5 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6C5CE7] ring-4 ring-violet-50" />
                <span className="text-[11px] sm:text-xs font-semibold text-gray-700">Currently Viewing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6C5CE7]/40 ring-4 ring-violet-50" />
                <span className="text-[11px] sm:text-xs font-semibold text-gray-700">Our Presence</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected District Detail Panel */}
        <div ref={rightPanelRef} className="bg-white rounded-none p-0 transition-all duration-500 flex flex-col justify-start relative z-20">

          {/* Blue Line Decoration */}
          <div className="w-14 sm:w-16 h-1 bg-[#0066FF] mb-5 sm:mb-6" />

          {/* Heading */}
          <div>
            <h3 className="font-sans text-brand-text text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.03em] leading-[1.1] mb-3 sm:mb-4">Helping businesses grow nationwide</h3>
          </div>

          {/* Paragraph */}
          <div>
            <p className="text-brand-text/80 text-[14px] max-w-100 sm:text-[15px] md:text-[16px] leading-[1.7] font-light mb-5">
              We partner with ambitious companies across Nepal to build, scale and transform for tomorrow.
            </p>
          </div>

          {/* Client Stories */}
          <div className="mt-1 sm:mt-2">
            <h4 className="font-sans text-[13px] sm:text-[16px] font-semibold text-gray-800 mb-3 sm:mb-4">Client Stories</h4>

            {isStoryLoading ? (
              <div className="w-full bg-[#f8f9fa] rounded-2xl p-3.5 sm:p-4 md:p-5 flex flex-col sm:flex-row gap-3.5 sm:gap-4 md:gap-5 relative overflow-hidden">
                <div className="w-full h-50 xs:h-[220px] sm:h-auto sm:w-[38%] sm:max-w-55 sm:self-stretch rounded-xl shimmer-block shrink-0" />
                <div className="flex flex-col flex-1 min-w-0 justify-between gap-3">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="h-5 w-20 rounded-full shimmer-block" />
                      <div className="h-4 w-12 rounded shimmer-block" />
                    </div>
                    <div className="flex flex-col gap-2 pl-3 py-0.5">
                      <div className="h-3.5 w-full rounded shimmer-block" />
                      <div className="h-3.5 w-3/4 rounded shimmer-block" />
                      <div className="h-3 w-1/2 rounded shimmer-block mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex -space-x-2">
                      <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full shimmer-block ring-2 ring-white" />
                      <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full shimmer-block ring-2 ring-white" />
                      <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full shimmer-block ring-2 ring-white" />
                    </div>
                    <div className="h-3.5 w-16 rounded shimmer-block" />
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={displayedDistrict}
                className="story-card-anim w-full bg-[#f8f9fa] rounded-2xl p-3.5 sm:p-4 md:p-5 flex flex-col sm:flex-row gap-3.5 sm:gap-4 md:gap-5 relative overflow-hidden select-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-full h-50 xs:h-[220px] sm:h-auto sm:w-[38%] sm:max-w-55 sm:self-stretch rounded-xl overflow-hidden relative shrink-0 group/thumb">
                  <video
                    ref={storyVideoRef}
                    key={activeData.story.video}
                    src={activeData.story.video || '/saas.mp4'}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover/thumb:bg-black/20 transition-colors" />
                  <button
                    onClick={toggleStoryPlayback}
                    className="absolute inset-0 m-auto w-9 h-9 rounded-full flex items-center justify-center bg-white/95 text-blue-600 shadow-md group-hover/thumb:scale-105 transition-transform"
                    aria-label={isStoryPlaying ? 'Pause client story video' : 'Play client story video'}
                  >
                    {isStoryPlaying ? (
                      <Pause size={14} className="fill-current" />
                    ) : (
                      <Play size={14} className="fill-current ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Right Side: Content — header (badge + rating), quote, footer (avatars + link) */}
                <div className="flex flex-col flex-1 min-w-0 justify-between gap-3">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12px] sm:text-[13px] font-semibold px-3 py-0.5 rounded-full bg-blue-50 text-blue-600 whitespace-nowrap">
                        {displayedDistrict}
                      </span>
                      <div className="flex font-bold items-center gap-1 text-[12px] sm:text-[14px] text-gray-500 whitespace-nowrap">
                        <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                        <span className="text-gray-900">{activeData.story.rating}</span> /5
                      </div>
                    </div>

                    {/* Review Quote Block */}
                    {activeData.story.review && (
                      <div className="flex flex-col text-left border-l-2 border-blue-500 pl-3 py-0.5 min-w-0">
                        <p className="text-[13px] sm:text-[14px] font-medium text-gray-900 leading-snug line-clamp-2">
                          “{activeData.story.review.quote}”
                        </p>
                        <span className="text-[11px] sm:text-[12px] text-gray-500 mt-1 truncate">
                          {activeData.story.review.business} • {activeData.story.review.location}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer Row: Avatars + Watch Now link */}
                  <div className="flex items-center justify-between gap-2 flex-nowrap min-w-0">
                    <div className="flex -space-x-2 overflow-hidden shrink-0">
                      {activeData.story.avatars.slice(0, 3).map((url, i) => (
                        <img
                          key={i}
                          className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-white object-cover border border-gray-100"
                          src={url}
                          alt="Client representative"
                        />
                      ))}
                      {activeData.story.avatars.length > 3 && (
                        <div className="flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-violet-100 text-[#6C5CE7] font-bold text-[10px] ring-2 ring-white z-10">
                          {activeData.story.avatars.length}+
                        </div>
                      )}
                    </div>

                    <span className="text-[12px] sm:text-[13px] font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap flex items-center gap-0.5 shrink-0">
                      Watch Now <ArrowRight size={11} className="stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* See What We Do Button */}
          <div className="flex justify-start mt-8">
            <button className="flex items-center gap-3 group">
              <span className="font-sans text-sm sm:text-base font-bold text-gray-900 group-hover:text-primary transition-colors">See what we do</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 bg-primary flex items-center justify-center text-white transition-all group-hover:bg-primary-hover group-hover:scale-105">
                <ChevronRight size={16} className="stroke-3" />
              </span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}