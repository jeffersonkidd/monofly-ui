/**
 * Button — a sample component to prove the Make-kit pipeline end to end.
 *
 * @param {object} props
 * @param {'primary'|'secondary'} [props.variant='primary']
 * @param {React.ReactNode} props.children
 */
export function Button({ variant = 'primary', children, ...rest }) {
  return (
    <button className={`jk-button jk-button--${variant}`} {...rest}>
      {children}
    </button>
  );
}
