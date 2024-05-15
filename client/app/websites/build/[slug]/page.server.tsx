// // pages/website/build/[slug].js
// import axios from "axios";

// export async function getServerSideProps(context) {
//   const { slug } = context.params;
//   const url = `http://spark-admin-production.up.railway.app/api/page-card/render/${slug}`;

//   try {
//     const response = await axios.get(url);
//     const htmlContent = response.data; // Assuming API returns HTML content directly

//     return {
//       props: { htmlContent },
//     };
//   } catch (error) {
//     console.error("Failed to fetch page:", error);
//     return {
//       props: { htmlContent: "<p>Error loading page content.</p>" }, // Handle errors gracefully
//     };
//   }
// }

// export default function DynamicPage({ htmlContent }) {
//   return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
// }
