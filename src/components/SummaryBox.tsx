interface SummaryBoxProps {
  summary: string;
  isLoading?: boolean;
}

function renderInline(text: string) {
  // Handle bold, italic, and emoji formatting
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|🔥|📝|⏸️|🌟|🤖|👤|📊|🚀|📈|🎯)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={idx} className="italic text-gray-700">{part.slice(1, -1)}</em>;
    }
    if (['🔥', '📝', '⏸️', '🌟', '🤖', '👤', '📊', '🚀', '📈', '🎯'].includes(part)) {
      return <span key={idx} className="text-lg">{part}</span>;
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function SummaryBox({ summary, isLoading = false }: SummaryBoxProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-900">Generating AI Summary...</h3>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-blue-200 rounded animate-pulse"></div>
          <div className="h-4 bg-blue-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-blue-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-blue-900">AI Profile Summary</h3>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700">
        {summary.split('\n').map((paragraph, index) => {
          // Handle different types of content
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3 first:mt-0">
                {renderInline(paragraph.slice(3))}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                {renderInline(paragraph.slice(4))}
              </h3>
            );
          }
          if (paragraph.trim() === '') {
            return <br key={index} />;
          }
          return (
            <p key={index} className="mb-3 last:mb-0 leading-relaxed">
              {renderInline(paragraph)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
