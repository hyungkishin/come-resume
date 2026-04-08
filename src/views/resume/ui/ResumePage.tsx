'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs } from '@/shared/ui/tabs/Tabs';
import { Sparkles } from '@/shared/ui/icons';
import { usePdfUpload } from '../lib/usePdfUpload';
import { useResumePolish } from '../lib/useResumePolish';
import { ResumeExport } from './ResumeExport';
import { ResumeInputTab } from './ResumeInputTab';
import { ResumeResultTab } from './ResumeResultTab';
import { JdMatchTab } from './JdMatchTab';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function ResumePage() {
  const [activeTab, setActiveTab] = useState('input');
  const [text, setText] = useState('');
  const [jdText, setJdText] = useState('');
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  const { isPdfLoading, fileInputRef, handlePdfUpload } = usePdfUpload(setText);
  const {
    isPolishing,
    result,
    handlePolish,
    isMatching,
    matchResult,
    handleMatch,
    copied,
    handleCopy,
    exportOpen,
    setExportOpen,
  } = useResumePolish();

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
            <Sparkles className="h-4 w-4 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-50">AI 이력서 폴리셔</h1>
        </div>
        <p className="mb-8 text-sm text-zinc-400">
          이력서를 붙여넣으면 AI가 임팩트 있는 성과 중심 문장으로 다듬어 드립니다.
        </p>
      </motion.div>

      <Tabs
        tabs={[
          { id: 'input', label: '이력서 입력' },
          { id: 'result', label: '폴리싱 결과' },
          { id: 'jd', label: 'JD 매칭' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === 'input' && (
        <motion.div {...fadeUp} transition={{ duration: 0.3 }}>
          <ResumeInputTab
            text={text}
            setText={setText}
            language={language}
            setLanguage={setLanguage}
            isPdfLoading={isPdfLoading}
            fileInputRef={fileInputRef}
            onPdfUpload={handlePdfUpload}
            onPolish={() => handlePolish(text, () => setActiveTab('result'))}
            isPolishing={isPolishing}
          />
        </motion.div>
      )}

      {activeTab === 'result' && (
        <ResumeResultTab
          result={result}
          text={text}
          copied={copied}
          onCopy={handleCopy}
          onExportClick={() => setExportOpen(true)}
        />
      )}

      {activeTab === 'jd' && (
        <JdMatchTab
          jdText={jdText}
          setJdText={setJdText}
          text={text}
          matchResult={matchResult}
          onMatch={() => handleMatch(text, jdText)}
          isMatching={isMatching}
        />
      )}

      {result && (
        <ResumeExport
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          content={result.polished}
        />
      )}
    </div>
  );
}
