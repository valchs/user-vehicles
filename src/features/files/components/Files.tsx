import React from 'react';
import { useGetFiles } from 'features/files';

const Files: React.FC = () => {
  const { getFiles, files } = useGetFiles();

  return (
    <div>
      <button onClick={() => getFiles()}>Click</button>
      {files[0]?.fileName ?? 'No files found'}
    </div>
  );
};

export default Files;
