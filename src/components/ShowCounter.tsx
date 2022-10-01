import DateTimeDisplay from "./DateTimeDisplay";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "700",
        fontSize: "1.25rem",
        lineHeight: "1.75rem",
        padding: "0.5rem",
        border: "1px solid #ebebeb",
        borderRadius: " 0.25rem",
        textDecoration: "none",
        color: "#000",
      }}
    >
      <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
    </div>
  );
};
export default ShowCounter;
