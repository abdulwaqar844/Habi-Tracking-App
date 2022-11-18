function DayHabitSquare({ day }) {
  
  const { done, disabled } = day;
  let bg;
  if (disabled) {
    bg = "gray";
  } else if (done) {
    bg = "green";
  } else {
    bg = "white";
  }

  return (
    <div
      style={{
        border: `1px solid gray`,
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center ",
        fontSize: "20px",
        background: bg,
        color: day.done ? "white" : "black",
        margin: "3px",
       
      }}
    >
      <p>{new Date(day.date).getDate()} </p>
    </div>
  );
}

export default DayHabitSquare;