import WAWebJS from "whatsapp-web.js";

type messageType<T> = T extends "text"
  ? {
      id: string;
      timestamp: number;
      type: "text";
      message: {
        isForwarded: boolean;
        forwardingScore: number;
        isNewMsg: boolean;
        body?: string;
      };
      author: {
        id: string;
        name: string;
        sender: string;
        deviceType: string;
      };
    }
  : T extends "media"
  ? {
      id: string;
      timestamp: number;
      type: "media";
      message: {
        isForwarded?: boolean;
        forwardingScore?: number;
        isNewMsg?: boolean;
        body: string;
      };
      media: {
        specs?: {
          width?: number;
          height?: number;
          size?: number;
          mimetype?: string;
        };
        data?: {
          mediaKey?: string;
          mediaKeyTimestamp?: number;
          directPath?: string;
          filehash?: string;
          encFilehash?: string;
        };
        deprecatedMms3Url?: string;
        isViewOnce?: boolean;
        staticUrl?: string;
        download: () => Promise<WAWebJS.MessageMedia>;
      };
    }
  : never;

async function parseMessage(msg: any) {
  // # Types
  // groups_v4_invite
  // chat
  // image (remote:!broadcast)

  const textWithImage =
    msg.type == "image" && !msg.id.remote.includes("broadcast");
  const justText = msg.type == "chat";

  if (textWithImage || justText) {
    const message: messageType<"text"> = {
      id: msg.id.id,
      timestamp: msg.timestamp || msg.t,
      type: "text",
      message: {
        isForwarded: !!msg.isForwarded,
        forwardingScore: msg._data.forwardingScore || 0,
        isNewMsg: !!msg._data.isNewMsg
        //   reaction: msg.hasReaction,
      },
      author: {
        id: msg?.id?.id || msg.from,
        name: msg._data.notifyName,
        sender: msg.id.remote,
        deviceType: msg.deviceType
      }
    };

    //Media Handling
    if (msg.hasMedia) {
      const mediaMessage: messageType<"media"> = {
        ...message,
        type: "media",
        message: {
          ...message.message,
          body: msg._data.caption
        },
        media: {
          specs: {
            width: msg._data.width,
            height: msg._data.height,
            size: msg._data.size,
            mimetype: msg._data.mimetype
          },
          data: {
            mediaKey: msg._data.mediaKey,
            mediaKeyTimestamp: msg._data.mediaKeyTimestamp,
            directPath: msg._data.directPath,
            filehash: msg._data.filehash,
            encFilehash: msg._data.encFilehash
          },
          deprecatedMms3Url: msg._data.deprecatedMms3Url,
          isViewOnce: msg._data.isViewOnce,
          staticUrl: msg._data.staticUrl,
          download: async () => {
            return msg.downloadMedia();
          }
        }
      };

      //Download Mehod;

      //Download;
      //   const media = await msg.downloadMedia();
    } else {
      message.message.body = msg.body as any;
    }

    return message;
  } else {
    console.log(msg);
  }

  return false;
}

exports.parseMessage = parseMessage;
