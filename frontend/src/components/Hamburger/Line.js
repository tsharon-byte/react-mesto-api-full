const Line = ({ collapsed }) => (
  <div className={`line${collapsed ? " line_type_collapsed" : ""}`} />
);
export default Line;
