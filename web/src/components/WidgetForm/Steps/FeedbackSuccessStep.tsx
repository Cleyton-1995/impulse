import successImageUrl from '../../../assets/success.svg'

import { CloseButton } from '../../CloseButton';

type FeedbackSuccessStepProps = {
  onFeedbackRestart: () => void;
};

function FeedbackSuccessStep({ onFeedbackRestart }: FeedbackSuccessStepProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <div className="grid justify-items-center my-10 sm:min-w-[19rem]">
        <img src={successImageUrl} alt="" />
        <span className="mt-2 text-xl leading-6 font-medium">
          Agradecemos o feedback!
        </span>

        <button
          className="
            py-2 px-6 mt-6
            bg-zinc-800 hover:bg-zinc-700
            rounded-[0.25rem]
            transition-colors
          "
          type="button"
          onClick={onFeedbackRestart}
        >
          Quero enviar outro
        </button>
      </div>
    </>
  );
}

export { FeedbackSuccessStep };