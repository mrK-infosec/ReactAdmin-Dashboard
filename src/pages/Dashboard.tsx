import { useState } from "react";
import { Header, Footer } from "../components";
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { Info, TrendingUp, TrendingDown, Ellipsis } from "lucide-react";
import "../styles/pages.css";

// Mock Data
const visitData = [
  { x: '2023-09-01', y: 7 }, { x: '2023-09-02', y: 5 }, { x: '2023-09-03', y: 4 },
  { x: '2023-09-04', y: 2 }, { x: '2023-09-05', y: 4 }, { x: '2023-09-06', y: 7 },
  { x: '2023-09-07', y: 5 }, { x: '2023-09-08', y: 6 }, { x: '2023-09-09', y: 5 },
  { x: '2023-09-10', y: 9 }, { x: '2023-09-11', y: 6 }, { x: '2023-09-12', y: 3 },
  { x: '2023-09-13', y: 1 }, { x: '2023-09-14', y: 5 }
];

const paymentData = [
  { x: '2023-09-01', y: 7 }, { x: '2023-09-02', y: 5 }, { x: '2023-09-03', y: 4 },
  { x: '2023-09-04', y: 2 }, { x: '2023-09-05', y: 4 }, { x: '2023-09-06', y: 7 },
  { x: '2023-09-07', y: 5 }, { x: '2023-09-08', y: 6 }, { x: '2023-09-09', y: 5 },
  { x: '2023-09-10', y: 9 }, { x: '2023-09-11', y: 6 }, { x: '2023-09-12', y: 3 }
];

const salesData = [
  { name: 'Jan', sales: 112 }, { name: 'Feb', sales: 120 }, { name: 'Mar', sales: 250 },
  { name: 'Apr', sales: 150 }, { name: 'May', sales: 180 }, { name: 'Jun', sales: 210 },
  { name: 'Jul', sales: 310 }, { name: 'Aug', sales: 270 }, { name: 'Sep', sales: 290 },
  { name: 'Oct', sales: 220 }, { name: 'Nov', sales: 130 }, { name: 'Dec', sales: 100 }
];

const rankingList = [
  { title: 'Gongzhuan No. 1 shop', total: '323,234' },
  { title: 'Gongzhuan No. 2 shop', total: '323,234' },
  { title: 'Gongzhuan No. 3 shop', total: '323,234' },
  { title: 'Gongzhuan No. 4 shop', total: '323,234' },
  { title: 'Gongzhuan No. 5 shop', total: '323,234' },
  { title: 'Gongzhuan No. 6 shop', total: '323,234' },
  { title: 'Gongzhuan No. 7 shop', total: '323,234' },
];

const searchData = [
  { index: 1, keyword: 'React', users: 893, weekly: '+32%' },
  { index: 2, keyword: 'Admin', users: 765, weekly: '-12%' },
  { index: 3, keyword: 'Dashboard', users: 654, weekly: '+5%' },
  { index: 4, keyword: 'Design', users: 432, weekly: '+8%' },
  { index: 5, keyword: 'AntD', users: 321, weekly: '-2%' },
];

const pieData = [
  { name: 'Direct', value: 4544 },
  { name: 'Search', value: 3321 },
  { name: 'Third Part', value: 3113 },
];
const COLORS = ['#6366f1', '#3b82f6', '#14b8a6'];

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="page-content ant-bg">
      <Header />
      <main className="main-content" style={{ padding: '24px', background: 'transparent' }}>
        
        {/* Top Cards Row */}
        <div className="ant-grid-4">
          <div className="ant-card">
            <div className="ant-card-header">
              <span>Total Sales</span>
              <Info size={14} color="#8c8c8c" />
            </div>
            <div className="ant-card-value">$ 126,560</div>
            <div className="ant-card-chart-area flex-row gap-4">
              <div className="trend-item">
                <span>WoW Change 12%</span> <TrendingUp size={14} color="#cf1322" />
              </div>
              <div className="trend-item">
                <span>DoD Change 11%</span> <TrendingDown size={14} color="#3f8600" />
              </div>
            </div>
            <div className="ant-card-footer">
              Daily Sales <span>$12,423</span>
            </div>
          </div>

          <div className="ant-card">
            <div className="ant-card-header">
              <span>Visits</span>
              <Info size={14} color="#8c8c8c" />
            </div>
            <div className="ant-card-value">8,846</div>
            <div className="ant-card-chart-area">
              <ResponsiveContainer width="100%" height={46}>
                <AreaChart data={visitData}>
                  <Area type="monotone" dataKey="y" stroke="#975FE4" fill="#975FE4" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="ant-card-footer">
              Daily Visits <span>1,234</span>
            </div>
          </div>

          <div className="ant-card">
            <div className="ant-card-header">
              <span>Payments</span>
              <Info size={14} color="#8c8c8c" />
            </div>
            <div className="ant-card-value">6,560</div>
            <div className="ant-card-chart-area">
              <ResponsiveContainer width="100%" height={46}>
                <BarChart data={paymentData}>
                  <Bar dataKey="y" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="ant-card-footer">
              Conversion Rate <span>60%</span>
            </div>
          </div>

          <div className="ant-card">
            <div className="ant-card-header">
              <span>Operational Effect</span>
              <Info size={14} color="#8c8c8c" />
            </div>
            <div className="ant-card-value">78%</div>
            <div className="ant-card-chart-area flex-center">
              <div className="progress-bg">
                <div className="progress-bar" style={{ width: '78%', background: '#13c2c2' }}></div>
              </div>
            </div>
            <div className="ant-card-footer flex-row gap-4">
              <div className="trend-item">
                <span>WoW 12%</span> <TrendingUp size={14} color="#cf1322" />
              </div>
              <div className="trend-item">
                <span>DoD 11%</span> <TrendingDown size={14} color="#3f8600" />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Tabs & Chart */}
        <div className="ant-main-card">
          <div className="ant-tabs-header">
            <div className="ant-tabs-nav">
              <button className={`ant-tab ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => setActiveTab('sales')}>Sales</button>
              <button className={`ant-tab ${activeTab === 'visits' ? 'active' : ''}`} onClick={() => setActiveTab('visits')}>Visits</button>
            </div>
            <div className="ant-tabs-extra">
              <a href="#">Today</a>
              <a href="#">This Week</a>
              <a href="#">This Month</a>
              <a href="#">This Year</a>
            </div>
          </div>
          <div className="ant-tabs-content">
            <div className="ant-chart-col">
              <h4>{activeTab === 'sales' ? 'Sales Trend' : 'Visits Trend'}</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8c8c8c'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#8c8c8c'}} />
                  <Tooltip cursor={{fill: 'rgba(0,0,0,0.04)'}} />
                  <Bar dataKey="sales" fill="#5470c6" barSize={32} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="ant-ranking-col">
              <h4>Store {activeTab === 'sales' ? 'Sales' : 'Visits'} Ranking</h4>
              <ul className="ranking-list">
                {rankingList.map((item, i) => (
                  <li key={i}>
                    <div className="rank-left">
                      <span className={`rank-badge ${i < 3 ? 'top-3' : ''}`}>{i + 1}</span>
                      <span className="rank-title">{item.title}</span>
                    </div>
                    <span>{item.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom 2 Columns */}
        <div className="ant-bottom-grid">
          <div className="ant-card">
            <div className="ant-card-title-bar">
              <h4>Online Top Search</h4>
              <Ellipsis size={18} color="#8c8c8c" cursor="pointer" />
            </div>
            <div className="search-charts gap-4">
               <div className="search-chart-col">
                 <div className="search-header">Search Users <Info size={12} color="#8c8c8c"/></div>
                 <div className="search-val">12,321 <span className="trend-item ml-2"><TrendingUp size={14} color="#cf1322" /> 17.1%</span></div>
                 <ResponsiveContainer width="100%" height={45}>
                   <AreaChart data={visitData}>
                     <Area type="monotone" dataKey="y" stroke="#1890ff" fill="#e6f7ff" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
               <div className="search-chart-col">
                 <div className="search-header">Per Capita Search <Info size={12} color="#8c8c8c"/></div>
                 <div className="search-val">2.7 <span className="trend-item ml-2"><TrendingDown size={14} color="#3f8600" /> 26.2%</span></div>
                 <ResponsiveContainer width="100%" height={45}>
                   <AreaChart data={visitData}>
                     <Area type="monotone" dataKey="y" stroke="#1890ff" fill="#e6f7ff" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
            <table className="ant-table mt-4">
              <thead>
                <tr>
                  <th>Rank</th><th>Search Keyword</th><th>Users</th><th>Weekly Range</th>
                </tr>
              </thead>
              <tbody>
                {searchData.map(row => (
                  <tr key={row.index}>
                    <td>{row.index}</td>
                    <td><a href="#" style={{color: '#1890ff', textDecoration: 'none'}}>{row.keyword}</a></td>
                    <td>{row.users}</td>
                    <td style={{ color: row.weekly.startsWith('+') ? '#cf1322' : '#3f8600' }}>{row.weekly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ant-card">
            <div className="ant-card-title-bar">
              <h4>Proportion of Sales</h4>
              <div className="ant-radio-group">
                <button className="active">All</button>
                <button>Online</button>
                <button>Stores</button>
              </div>
            </div>
            <div className="pie-chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};
