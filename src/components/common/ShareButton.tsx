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
import { CSSProperties } from "react";
import { HiOutlineShare } from "react-icons/hi";

import Modal from "@Components/Modal";

import { DialogType, useDialog } from "@Lib/contexts/UIContext";

export default function ShareButton({
  title,
  description,
  image,
  hashtags,
}: PropTypes) {
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
            style={cssOverride}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <PinterestShareButton
            url={typeof location != "undefined" ? location.href : ""}
            media={image}
            description={description}
            style={cssOverride}
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <TwitterShareButton
            url={typeof location != "undefined" ? location.href : ""}
            title={description}
            style={cssOverride}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton
            url={typeof location != "undefined" ? location.href : ""}
            title={title}
            separator=":: "
            style={cssOverride}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <EmailShareButton
            url={typeof location != "undefined" ? location.href : ""}
            subject={title}
            body={description}
            style={cssOverride}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      </Modal>
    </div>
  );
}

interface PropTypes {
  title: string;
  description: string;
  image: string;
  hashtags: string;
}

const cssOverride: CSSProperties = {
  marginRight: "1rem"
};