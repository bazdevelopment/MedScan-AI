import { type IScrollCloseToBottom } from '@/components/parallax-scrollview/parallax-scrollview.interface';

export const checkIsCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: IScrollCloseToBottom) => {
  'worklet';
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
