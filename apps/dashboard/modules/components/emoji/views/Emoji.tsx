type EmojiProps = {
  label: string;
  symbol: string;
  spaceAfter?: boolean;
};
function Emoji({ label, symbol, spaceAfter = true }: EmojiProps) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label ? label : ''}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
      {spaceAfter && <span> </span>}
    </span>
  );
}
export default Emoji;
