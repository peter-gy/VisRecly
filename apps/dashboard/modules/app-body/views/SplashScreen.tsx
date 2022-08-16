import { Player } from '@lottiefiles/react-lottie-player';

function SplashScreen() {
  return (
    <div className="h-screen w-[100vw] flex justify-center items-center">
      <div className="p-4 w-[90vw] h-[90vh] bg-white flex flex-col justify-start items-center rounded-md space-y-4">
        <h1 className="text-2xl lg:text-4xl xl:text-6xl">VisRecly</h1>
        <p className="muted italic">
          Towards a User-task-focused Visualization Recommender Tool
        </p>
        <Player
          autoplay
          loop
          src="/lottie/splash.json"
          style={{ height: '70vh', width: '70vh' }}
        ></Player>
      </div>
    </div>
  );
}

export default SplashScreen;
