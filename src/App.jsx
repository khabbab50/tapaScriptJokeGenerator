// import { Button } from "./components/ui/button";

import JokeGenerator from "./components/randomJokeGenerator/JokeGenerator";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh bg-purple-300">
        {/* <Button>Click me</Button> */}
        <JokeGenerator />
      </div>
    </>
  );
}

export default App;
