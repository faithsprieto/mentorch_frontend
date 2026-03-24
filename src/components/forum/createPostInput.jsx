import { useState } from "react";
import PostModal from "./postModal";

function CreatePostInput() {

  const [open, setOpen] = useState(false);

  return (
    <div className="share-thoughts">

      <input
        placeholder="Share your thoughts..."
        onFocus={() => setOpen(true)}
        readOnly
      />

      {open && <PostModal close={() => setOpen(false)} />}

    </div>
  );
}

export default CreatePostInput;