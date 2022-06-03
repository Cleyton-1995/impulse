import { useState } from 'react';
import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';

import { Loading } from '../Loading';

type ScreenshotButtonProps = {
  screenshot: string | null;
  onScreenshotTaken: (screenshot: string | null) => void;
};

function ScreenshotButton({
  screenshot,
  onScreenshotTaken,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64Image = canvas.toDataURL('image/png');
    onScreenshotTaken(base64Image);

    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        className="
          flex items-end justify-end
          w-10 h-10
          p-[0.125rem]
          rounded-[0.25rem]
          bg-cover bg-center
        "
        style={{ backgroundImage: `url(${screenshot})` }}
        type="button"
        onClick={() => onScreenshotTaken(null)}
      >
        <Trash className="w-4 h-4 text-zinc-400" weight="fill" />
      </button>
    );
  }

  return (
    <button
      className="
        p-2
        bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700
        text-zinc-100
        rounded-[0.25rem]
        transition-colors
      "
      type="button"
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}

export { ScreenshotButton }