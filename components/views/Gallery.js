import { default as dataToCard } from "../Card";
export default st => `
<section>
${st.pictures.reduce(
  (html, pic) =>
    html + `${dataToCard(`<img src="${pic.url}" alt="${pic.title}">`)}`,
  ``
)}
</section>
`;
