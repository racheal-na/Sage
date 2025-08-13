function StatusBadge(props) {
  let statusText;
  switch (props.status) {
    case "pending":
      statusText = <span style={{ color: "orange" }}>Pending</span>;
      break;
    case "complete":
      statusText = <span style={{ color: "green" }}>Complete</span>;
      break;
    case "failed":
      <span style={{ color: "red" }}>Failed</span>;
      break;
    default:
      <span style={{ color: "gray" }}>Gray</span>;
  }
  return <div>Status: {statusText}</div>;
}
<StatusBadge status="Complete"/>


export default StatusBadge
