import LoadingIndicator from '@dashboard/modules/components/loading-indicator/views/LoadingIndicator';

function SplashScreen() {
  return (
    <div className="h-screen w-[100vw] flex justify-center items-center">
      <div className="p-4 w-[90vw] h-[90vh] bg-white flex flex-col justify-center items-center rounded-md space-y-4">
        <LoadingIndicator />
      </div>
    </div>
  );
}

export default SplashScreen;
