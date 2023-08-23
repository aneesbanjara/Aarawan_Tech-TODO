import { AiOutlineMenu } from "react-icons/ai";

function App() {
  return (
    <header>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "3rem",
          backgroundColor: "white",
          padding: "0 1.5rem",
        }}
      >
        <AiOutlineMenu size="20px" />
      </div>
    </header>
  );
}

export default App;
