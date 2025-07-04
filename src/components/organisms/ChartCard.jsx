import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartCard = ({ title, type = 'line', data, height = 300, className = '' }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (!data) return;

    const baseOptions = {
      chart: {
        type: type,
        toolbar: { show: false },
        background: 'transparent',
        fontFamily: 'Inter, sans-serif'
      },
      colors: ['#2563EB', '#10B981', '#F59E0B', '#EF4444'],
      grid: {
        borderColor: '#f1f5f9',
        strokeDashArray: 2,
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.5,
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.1,
          stops: [0, 100]
        }
      },
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontFamily: 'Inter, sans-serif'
      }
    };

    switch (type) {
      case 'line':
        setChartOptions({
          ...baseOptions,
          xaxis: {
            categories: data.categories || [],
            labels: {
              style: {
                colors: '#64748b',
                fontSize: '12px'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                colors: '#64748b',
                fontSize: '12px'
              }
            }
          }
        });
        setChartSeries(data.series || []);
        break;

      case 'bar':
        setChartOptions({
          ...baseOptions,
          plotOptions: {
            bar: {
              borderRadius: 8,
              dataLabels: {
                position: 'top'
              }
            }
          },
          xaxis: {
            categories: data.categories || [],
            labels: {
              style: {
                colors: '#64748b',
                fontSize: '12px'
              }
            }
          }
        });
        setChartSeries(data.series || []);
        break;

      case 'donut':
        setChartOptions({
          ...baseOptions,
          labels: data.labels || [],
          plotOptions: {
            pie: {
              donut: {
                size: '65%',
                labels: {
                  show: true,
                  total: {
                    show: true,
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#374151'
                  }
                }
              }
            }
          }
        });
        setChartSeries(data.values || []);
        break;

      default:
        setChartOptions(baseOptions);
        setChartSeries(data.series || []);
    }
  }, [data, type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type={type}
        height={height}
      />
    </motion.div>
  );
};

export default ChartCard;