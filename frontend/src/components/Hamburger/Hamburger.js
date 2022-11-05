import Line from "./Line";

const Hamburger = ({ collapsed, setCollapsed }) => (
  <div className="burger" onClick={() => setCollapsed(!collapsed)}>
    <Line collapsed={collapsed} />
    <Line collapsed={collapsed} />
    <Line collapsed={collapsed} />
  </div>
);
export default Hamburger;
