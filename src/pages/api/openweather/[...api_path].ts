import type { NextApiRequest, NextApiResponse } from 'next';
import { serverEnvs } from "@/utils/serverEnvs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { api_path: pathSegments, ...query } = req.query;

  if (!pathSegments || typeof pathSegments === "string") {
    return res.status(404);
  }

  const apiPath = pathSegments.join("/");
  const queryParams = new URLSearchParams(query as {[x: string]: string});
  const apiUrl = `${serverEnvs.openweatherApiUrl}${apiPath}?${queryParams}&appid=${serverEnvs.openweatherApiKey}`;
  const dataRequest = await fetch(apiUrl);
  const data = await dataRequest.json();

  return res.status(dataRequest.status).json(data);
}
