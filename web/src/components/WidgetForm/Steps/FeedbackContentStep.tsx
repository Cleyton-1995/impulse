import { type ChangeEvent, type FormEvent, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';

import { type FeedbackType, FEEDBACK_TYPES } from '..';
import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';
import { api } from '../../../lib/api';
import { Loading } from '../../Loading';

type FeedbackContentStepProps = {
  feedbackType: FeedbackType;
  onFeedbackRestart: () => void;
  onFeedbackSent: () => void;
};

function FeedbackContentStep({
  feedbackType,
  onFeedbackRestart,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const { title, imageSource } = FEEDBACK_TYPES[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }

  async function handleFeedbackSubmit(event: FormEvent<HTMLFormElement>) {
    // Preventing the page from reloading
    event.preventDefault();

    setIsSendingFeedback(true);

    await api.post('./feedbacks', {
      type: 'feedbackType',
      comment,
      screenshot,
    })

    // console.log({ comment: comment.trim(), screenshot });

    setIsSendingFeedback(false);
    
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          className="
            absolute top-4 left-4
            p-1
            text-zinc-400 hover:text-zinc-100
            transition-colors
          "
          type="button"
          onClick={onFeedbackRestart}
        >
          <ArrowLeft className="w-4 h-4" weight="bold" />
        </button>

        <span className="flex gap-2 items-center text-xl leading-6">
          <img className="w-6 h-6" src={imageSource} alt="" />
          {title}
        </span>

        <CloseButton />
      </header>

      <form
        className="grid gap-2 w-full sm:min-w-[19rem] my-4"
        onSubmit={handleFeedbackSubmit}
      >
        <label htmlFor="comment" className="sr-only">
          Comentário
        </label>
        <textarea
          id="comment"
          className="
            w-full h-40 sm:h-28
            bg-transparent
            border-2
            border-zinc-600 focus:border-brand-500 rounded-[0.25rem]
            focus:outline-none focus:ring-0
            scrollbar scrollbar-thumb-zinc-600 scrollbar-track-transparent
            scrollbar-custom
            placeholder-zinc-400 text-zinc-100 resize-none
            transition-colors
          "
          placeholder="Conte com detalhes o que está acontecendo..."
          value={comment}
          onChange={handleTextareaChange}
        />

        <div className="flex gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTaken={setScreenshot}
          />

          <button
            className="
              bg-brand-500 hover:bg-brand-400 focus:bg-brand-400
              disabled:hover:bg-brand-500
              text-sm leading-6
              rounded-[0.25rem]
              disabled:opacity-50
              transition-colors
              flex-1
              flex
              justify-center
              items-center
            "
            type="submit"
            disabled={!comment.trim()}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </div>
      </form>
    </>
  );
}

export { FeedbackContentStep };