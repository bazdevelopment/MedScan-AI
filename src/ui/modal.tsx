/* eslint-disable max-lines-per-function */
/**
 * Modal
 * Dependencies:
 * - @gorhom/bottom-sheet.
 *
 * Props:
 * - All `BottomSheetModalProps` props.
 * - `title` (string | undefined): Optional title for the modal header.
 *
 * Usage Example:
 * import { Modal, useModal } from '@gorhom/bottom-sheet';
 *
 * function DisplayModal() {
 *   const { ref, present, dismiss } = useModal();
 *
 *   return (
 *     <View>
 *       <Modal
 *         snapPoints={['60%']} // optional
 *         title="Modal Title"
 *         ref={ref}
 *       >
 *         Modal Content
 *       </Modal>
 *     </View>
 *   );
 * }
 *
 */

import type {
  BottomSheetBackdropProps,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetModal, useBottomSheet } from '@gorhom/bottom-sheet';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Icon from '@/components/icon';

import { CloseIcon } from './assets/icons';
import colors from './colors';
import { Text } from './text';

type ModalProps = BottomSheetModalProps & {
  title?: string;
  canBeDismissed?: boolean;
};

type ModalRef = React.ForwardedRef<BottomSheetModal>;

type ModalHeaderProps = {
  title?: string;
  dismiss: () => void;
};

export const useModal = () => {
  const ref = React.useRef<BottomSheetModal>(null);
  const present = React.useCallback((data?: any) => {
    ref.current?.present(data);
  }, []);
  const dismiss = React.useCallback(() => {
    ref.current?.dismiss();
  }, []);
  return { ref, present, dismiss };
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Modal = React.forwardRef(
  (
    {
      snapPoints: _snapPoints = ['60%'],
      title,
      detached = false,
      canBeDismissed = true,
      children,
      ...props
    }: ModalProps,
    ref: ModalRef,
  ) => {
    const detachedProps = React.useMemo(
      () => getDetachedProps(detached),
      [detached],
    );
    const modal = useModal();
    const snapPoints = React.useMemo(() => _snapPoints, [_snapPoints]);

    React.useImperativeHandle(
      ref,
      () => (modal.ref.current as BottomSheetModal) || null,
    );

    const renderHandleComponent = React.useCallback(
      () => (
        <>
          <View className="mb-8 mt-2 h-1 w-12 self-center rounded-lg bg-gray-400 dark:bg-gray-700" />
          {canBeDismissed && (
            <ModalHeader title={title} dismiss={modal.dismiss} />
          )}
        </>
      ),
      [title, modal.dismiss, canBeDismissed],
    );

    const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
      const { close } = useBottomSheet();
      return (
        <AnimatedPressable
          onPress={() => canBeDismissed && close()}
          entering={FadeIn.duration(50)}
          exiting={FadeOut.duration(20)}
          style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.4)' }]}
        />
      );
    };

    const renderBackdrop = (props: BottomSheetBackdropProps) => {
      return <CustomBackdrop {...props} />;
    };

    return (
      <BottomSheetModal
        {...props}
        {...detachedProps}
        ref={modal.ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={props.backdropComponent || renderBackdrop}
        handleComponent={canBeDismissed ? renderHandleComponent : null}
      >
        {children}
      </BottomSheetModal>
    );
  },
);

/**
 * Custom Backdrop
 */

/**
 *
 * @param detached
 * @returns
 *
 * @description
 * In case the modal is detached, we need to add some extra props to the modal to make it look like a detached modal.
 */

const getDetachedProps = (detached: boolean) => {
  if (detached) {
    return {
      detached: true,
      bottomInset: 46,
      style: { marginHorizontal: 16, overflow: 'hidden' },
    } as Partial<BottomSheetModalProps>;
  }
  return {} as Partial<BottomSheetModalProps>;
};

/**
 * ModalHeader
 */

const ModalHeader = React.memo(({ title, dismiss }: ModalHeaderProps) => {
  return (
    <View className="mx-6 mb-2 flex-row items-center justify-between">
      {title && (
        <View className="flex-1">
          <Text className="font-semibold-nunito text-lg text-black dark:text-white">
            {title}
          </Text>
        </View>
      )}
      <View className="flex-1 flex-row justify-end">
        <CloseButton close={dismiss} />
      </View>
    </View>
  );
});

const CloseButton = ({ close }: { close: () => void }) => {
  return (
    <Icon
      containerStyle="p-1.5 bg-black rounded-full"
      icon={<CloseIcon />}
      size={16}
      color={colors.white}
      onPress={close}
    />
  );
};
