import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file") as File;
  const ip = data.get("ip") as string;

  const fileName = file.name;
  try {
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      return NextResponse.json({ err: "Error Wrong File Type", fileName });
    }

    if (file.size / (1024 * 1024) > 20) {
      return NextResponse.json({ err: "Error File Size", fileName });
    }

    const s3 = new S3({
      accessKeyId: process.env.NEXT_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_S3_SECRET_ACCESS_KEY,
      region: process.env.NEXT_S3_REGION,
    });

    const params = {
      Bucket: process.env.NEXT_S3_BUCKET || "",
      Key: `tutanak/oytutanak.com/${ip}/${file.name}_lastTimeChanged=${new Date(
        file.lastModified
      ).toISOString()})_sendingTime=${Date.now().toString()}_${uuidv4()}`,
      Body: await Buffer.from(await file.arrayBuffer()),
    };

    const upload = s3.upload(params);

    await upload.promise().catch((err) => {
      console.log(err);
      return NextResponse.json({ err: "Error", fileName });
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "Error", fileName });
  }

  return NextResponse.json({ message: "File uploaded successfully", fileName });
}
