import Message from "whatsapp-web.js/src/structures/Message";

/**
 *
 * @param {Message} msg
 * @returns
 */
async function parseMessage(msg) {
  // # Types
  // groups_v4_invite
  // chat
  // image (remote:!broadcast)

  const textWithImage =
    msg.type == "image" && !msg.id.remote.includes("broadcast");
  const justText = msg.type == "chat";

  if (textWithImage || justText) {
    const message = {
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
      message.type = "media";
      message.message.body = msg._data.caption;
      message.media = {
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
        staticUrl: msg._data.staticUrl
      };

      //Download Mehod;
      message.media.download = async () => {
        return msg.downloadMedia();
      };
      //Download;
      //   const media = await msg.downloadMedia();
    } else {
      message.message.body = msg.body;
    }

    return message;
  } else {
    console.log(msg);
  }

  return false;
}

exports.parseMessage = parseMessage;
