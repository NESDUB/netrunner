import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  version: string;
  features: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    name: "Next.js 3D Starter API",
    version: "1.0.0",
    features: ["Three.js", "React", "Next.js", "Google Fonts"]
  });
}
