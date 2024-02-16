import clsx from 'clsx';
import { ReactTagProps } from './types';

export type ContainerProps = ReactTagProps<'div'>;

export const Container = (props: ContainerProps) => {
  return (
    <div
      {...props}
      className={clsx(props.className, 'max-w-6xl m-auto px-4')}
    />
  );
};