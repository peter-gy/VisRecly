import { Player } from '@lottiefiles/react-lottie-player';

import GitHubIcon from '@dashboard/modules/components/icons/views/GitHubIcon';
import ThesisIcon from '@dashboard/modules/components/icons/views/ThesisIcon';

function MobileAppBody() {
  return (
    <div className="h-screen w-[100vw] flex justify-center items-center text-center">
      <div className="p-10 w-[90vw] h-[90vh] max-h-[90vh] bg-white flex flex-col justify-start items-center rounded-md space-y-6 overflow-auto">
        <div className="flex flex-col justify-center items-center space-y-4">
          <p className="text-xl">
            💥 Oh snap, the screen size of your device is not supported yet.
          </p>
          <p className="font-bold">
            Please try again using a bigger screen size.
          </p>
        </div>
        <Player
          autoplay
          loop
          src="/lottie/bar-chart.json"
          style={{ height: '50vh', width: '50vw' }}
        ></Player>
        <div className="grow"></div>
        <div className="flex flex-col space-y-2 justify-center items-center">
          <h1 className="text-2xl font-bold">VisRecly</h1>
          <p className="muted italic">
            Towards a User-task-focused Visualization Recommender Tool
          </p>
          <div className="flex justify-center items-center space-x-8">
            <GitHubIcon />
            <ThesisIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileAppBody;
