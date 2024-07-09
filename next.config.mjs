/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/danh-gia-nha-thuoc/:slug*",
        destination: "/feedback-drugstore/:slug*",
      },
      {
        source: "/danh-sach-nha-thuoc/:slug*",
        destination: "/drugstore/:slug*",
      },
      {
        source: "/san-pham-tien-loi/:slug*",
        destination: "/convenience/:slug*",
      },
      {
        source: "/cham-soc-sac-dep-co-the/:slug*",
        destination: "/beauty-care/:slug*",
      },
      {
        source: "/me-va-be/:slug*",
        destination: "/mombaby/:slug*",
      },
      {
        source: "/cham-soc-ca-nhan/:slug*",
        destination: "/personal-care/:slug*",
      },
      {
        source: "/thuc-pham-chuc-nang/:slug*",
        destination: "/functional-food/:slug*",
      },
      {
        source: "/duoc-pham/:slug*",
        destination: "/medicine/:slug*",
      },
      {
        source: "/duoc-pham",
        destination: "/medicine",
      },
      {
        source: "/thuoc-khong-ke-don",
        destination: "/medicine/nonprescription",
      },
      {
        source: "/thuoc-ke-don",
        destination: "/medicine/prescription",
      },
      {
        source: "/thuc-pham-chuc-nang",
        destination: "/functional-food",
      },
      {
        source: "/cham-soc-sac-dep",
        destination: "/functional-food/beauty-care",
      },
      {
        source: "/tpcn-dep-da",
        destination: "/functional-food/beauty-care/skin",
      },
      {
        source: "/cham-soc-ca-nhan",
        destination: "/personal-care",
      },
      {
        source: "/san-pham-khu-mui",
        destination: "/personal-care/deodorant",
      },
      {
        source: "/cham-soc-co-the",
        destination: "/personal-care/body",
      },
      {
        source: "/lan-khu-mui",
        destination: "/personal-care/deodorant/deodorant-roll",
      },
      {
        source: "/duong-the",
        destination: "/personal-care/body/body-care",
      },
      {
        source: "/me-va-be",
        destination: "/mombaby",
      },
      {
        source: "/cham-soc-em-be",
        destination: "/mombaby/baby-care",
      },
      {
        source: "/cham-soc-ca-nhan-cho-be",
        destination: "/mombaby/baby-care/baby-personal-care",
      },
      {
        source: "/cham-soc-sac-dep-co-the",
        destination: "/beauty-care",
      },
      {
        source: "/cham-soc-mat",
        destination: "/beauty-care/skincare",
      },
      {
        source: "/sua-rua-mat",
        destination: "/beauty-care/skincare/cleanser",
      },
      {
        source: "/san-pham-tien-loi",
        destination: "/convenience",
      },
      {
        source: "/hang-tong-hop",
        destination: "/convenience/convenience-product",
      },
      {
        source: "/khan-giay-khan-uot",
        destination: "/convenience/convenience-product/tissue",
      },
      {
        source: "/lich-su-don-hang",
        destination: "/orderhistory",
      },
      {
        source: "/danh-sach-nha-thuoc",
        destination: "/drugstore",
      },
    ];
  },
};

export default nextConfig;
