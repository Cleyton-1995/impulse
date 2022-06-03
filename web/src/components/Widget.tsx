import { Popover } from '@headlessui/react';
import { ChatTeardropDots } from 'phosphor-react';
import { WidgetForm } from './WidgetForm';

function Widget() {
  return (
    <Popover
      className="
        grid justify-items-end
        fixed bottom-4 right-4 sm:bottom-8 sm:right-8
      "
    >
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button
        className="
          flex group
          p-3
          rounded-full
          bg-brand-500 hover:bg-brand-400
          text-white
          transition-colors
        "
      >
        <ChatTeardropDots className="w-6 h-6" />

        <span
          className="
            max-w-0 group-hover:max-w-xs
            overflow-hidden
            transition-all duration-500 ease-linear
          "
        >
          <span className="ml-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}

export { Widget };