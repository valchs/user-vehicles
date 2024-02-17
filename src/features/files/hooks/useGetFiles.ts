import { useAppDispatch, useAppSelector } from "store";
import { getFilesAction } from "features/files/actions";

const useGetFiles = () => {
  const dispatch = useAppDispatch();
  const { files } = useAppSelector((state) => state.files);

  const getFiles = () => {
    dispatch(getFilesAction()).unwrap();
  };

  return { getFiles, files };
};

export default useGetFiles;
