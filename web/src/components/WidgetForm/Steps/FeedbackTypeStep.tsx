import { type FeedbackType, FEEDBACK_TYPES } from '..';
import { CloseButton } from '../../CloseButton';

type FeedbackTypeStepProps = {
  onFeedbackTypeChange: (key: FeedbackType) => void;
};

function FeedbackTypeStep({ onFeedbackTypeChange }: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>

        <CloseButton />
      </header>

      <div className="flex flex-wrap gap-2 w-full my-8">
        {Object.entries(FEEDBACK_TYPES).map(([key, { title, imageSource }]) => (
          <button
            key={key}
            className="
              grid justify-items-center gap-2
              flex-1 min-w-[6rem]
              py-5 w-24
              border-2 border-transparent hover:border-brand-500
              bg-zinc-800
              focus:border-brand-500 rounded-lg focus:outline-none
              focus:ring-0
              transition-colors
            "
            type="button"
            onClick={() => onFeedbackTypeChange(key as FeedbackType)}
          >
            {/* These images are decorative, therefore they don't need an alt
            value */}
            <img src={imageSource} alt="" />
            <span className="text-sm leading-6 font-medium">{title}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export { FeedbackTypeStep };