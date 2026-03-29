
import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const DashboardHome = () => {
  const chartRef = useRef(null);

  // Sample financial summary data – replace with real data from your backend/API
  const financialSummary = [
    { title: 'Total Cash at Bank', value: 'KES 30,864.00', showMiniBars: true },
    { title: 'Total Contributions', value: 'KES 7,049,999.00', showMiniBars: true },
    { title: 'Total Fines', value: 'KES 13,945.00', showMiniBars: false },
    { title: 'Total Cash unreconciled', value: 'KES 0.00', showMiniBars: false },
    { title: 'Total Expenses', value: 'KES 43,110.00', showMiniBars: false },
    { title: 'Total Money Market Investment', value: 'KES 3,230,000.00', showMiniBars: false },
    { title: 'Total Cash at Hand', value: 'KES 1,253,253.00', showMiniBars: false },
  ];

  // Chart setup
  useLayoutEffect(() => {
    let root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.verticalLayout,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'month',
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Series 1: Contributions (blue bars)
    let seriesContributions = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Group Contributions',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'contributions',
        categoryXField: 'month',
      })
    );
    seriesContributions.columns.template.setAll({
      fill: am5.color(0x3b82f6),
      stroke: am5.color(0x3b82f6),
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
    });

    // Series 2: Fines (yellow line + bullets)
    let seriesFines = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Fines',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'fines',
        categoryXField: 'month',
      })
    );
    seriesFines.strokes.template.setAll({
      stroke: am5.color(0xfacc15),
      strokeWidth: 3,
    });
    seriesFines.bullets.push(() => {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0xfacc15),
          stroke: am5.color(0xffffff),
          strokeWidth: 2,
        }),
      });
    });

    // Sample monthly data (replace with real values)
    let chartData = [
      { month: 'Jan', contributions: 100, fines: 0 },
      { month: 'Feb', contributions: 500, fines: 0 },
      { month: 'Mar', contributions: 2550, fines: 400 },
      { month: 'Apr', contributions: 0, fines: 0 },
      { month: 'May', contributions: 0, fines: 0 },
      { month: 'Jun', contributions: 0, fines: 0 },
      { month: 'Jul', contributions: 0, fines: 0 },
      { month: 'Aug', contributions: 0, fines: 0 },
      { month: 'Sep', contributions: 0, fines: 0 },
      { month: 'Oct', contributions: 0, fines: 0 },
      { month: 'Nov', contributions: 0, fines: 0 },
      { month: 'Dec', contributions: 0, fines: 0 },
    ];

    xAxis.data.setAll(chartData);
    seriesContributions.data.setAll(chartData);
    seriesFines.data.setAll(chartData);

    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className="space-y-10 pb-12">
      {/* Group Financial Summary – visible immediately */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-200">
        <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-3">
            <span className="text-xl">ⓘ</span> Group Financial Summary
          </h2>
          <span className="text-white font-medium">Group</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-blue-600">
          {financialSummary.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 flex flex-col justify-between min-h-[150px]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{item.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
                </div>

                {item.showMiniBars && (
                  <div className="w-24 h-14 bg-blue-100 rounded flex items-end gap-1 p-2 overflow-hidden">
                    <div className="flex-1 bg-blue-500 h-5 rounded-sm"></div>
                    <div className="flex-1 bg-blue-500 h-10 rounded-sm"></div>
                    <div className="flex-1 bg-blue-500 h-7 rounded-sm"></div>
                    <div className="flex-1 bg-blue-500 h-4 rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deposits & Withdrawals Chart – scroll down to see */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-3">
            <span className="text-xl">📊</span> DEPOSITS & WITHDRAWALS
          </h2>
          <button className="text-gray-500 hover:text-gray-700 transition">
            <ChevronDown size={20} />
          </button>
        </div>

        <div id="chartdiv" className="w-full h-[450px]"></div>

        <div className="mt-4 text-xs text-gray-500 text-center italic">
          JS chart by amCharts
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;