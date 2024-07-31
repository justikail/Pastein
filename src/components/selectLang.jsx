export default function SelectLang({ className, lang, onChange }) {
  return (
    <select className={className} value={lang} onChange={onChange}>
      <option value="text">Plain Text</option>
      <option value="python">Python</option>
      <option value="cpp">C++</option>
      <option value="php">PHP</option>
      <option value="go">Go</option>
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="javascript">JavaScript</option>
      <option value="perl">Perl</option>
      <option value="java">Java</option>
      <option value="ruby">Ruby</option>
    </select>
  );
}
