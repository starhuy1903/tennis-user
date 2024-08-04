import Lottie from 'react-lottie';

type LottieAnimationProps = {
  animationData: any;
  height?: number;
  width?: number;
};

export default function LottieAnimation({ animationData, height = 100, width = 100 }: LottieAnimationProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={height}
      width={width}
    />
  );
}
