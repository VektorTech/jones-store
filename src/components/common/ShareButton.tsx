import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import Modal from "@Components/Modal";
import { HiOutlineShare } from "react-icons/hi";

import { DialogType, useDialog } from "@Lib/contexts/UIContext";

export default function ShareButton({
  title,
  description,
  image,
  hashtags,
}: {
  title: string;
  description: string;
  image: string;
  hashtags: string;
}) {
  const { currentDialog, setDialog } = useDialog();
  const shareModalOpen = currentDialog == DialogType.MODAL_SHARE;

  return (
    <div>
      <button
        className="product-view__share-button"
        onClick={() => setDialog(DialogType.MODAL_SHARE)}
      >
        <HiOutlineShare />
      </button>
      <Modal
        title="Share"
        visible={shareModalOpen}
        onClose={() => setDialog(null)}
      >
        <div>
          <FacebookShareButton
            url={typeof location != "undefined" ? location.href : ""}
            quote={description}
            hashtag={hashtags}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <PinterestShareButton
            url={typeof location != "undefined" ? location.href : ""}
            media={image}
            description={description}
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <TwitterShareButton
            url={typeof location != "undefined" ? location.href : ""}
            title={description}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton
            url={typeof location != "undefined" ? location.href : ""}
            title={title}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <EmailShareButton
            url={typeof location != "undefined" ? location.href : ""}
            subject={title}
            body={description}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </Modal>
    </div>
  );
}
