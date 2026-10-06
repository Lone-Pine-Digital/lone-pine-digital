import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    URLInput
} from '@wordpress/block-editor';

import { Button, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const {
        videoUrl,
        heading,
        paragraph,
        button1Text,
        button1Url,
        button2Text,
        button2Url
    } = attributes;

    const blockProps = useBlockProps({
        className: "hero-video-editor"
    });

    return (
        <div {...blockProps}>

            {/* Video Upload */}
            <div className="hero-video-upload">
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => setAttributes({ videoUrl: media.url })}
                        allowedTypes={['video']}
                        render={({ open }) => (
                            <Button onClick={open} variant="primary">
                                {videoUrl ? 'Change Background Video' : 'Select Background Video'}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>

                {videoUrl && (
                    <video
                        src={videoUrl}
                        className="hero-video-preview"
                        muted
                        playsInline
                    />
                )}
            </div>

            {/* Heading */}
            <RichText
                tagName="h1"
                className="hero-heading"
                value={heading}
                onChange={(value) => setAttributes({ heading: value })}
                placeholder="Add hero heading…"
            />

            {/* Paragraph */}
            <RichText
                tagName="p"
                className="hero-paragraph"
                value={paragraph}
                onChange={(value) => setAttributes({ paragraph: value })}
                placeholder="Add supporting paragraph…"
            />

            {/* Buttons */}
            <div className="hero-buttons-editor">

                {/* Button 1 */}
                <TextControl
                    label="Button 1 Text"
                    value={button1Text}
                    onChange={(value) => setAttributes({ button1Text: value })}
                />

                <URLInput
                    label="Button 1 URL"
                    value={button1Url}
                    onChange={(value) => setAttributes({ button1Url: value })}
                />

                {/* Button 2 */}
                <TextControl
                    label="Button 2 Text"
                    value={button2Text}
                    onChange={(value) => setAttributes({ button2Text: value })}
                />

                <URLInput
                    label="Button 2 URL"
                    value={button2Url}
                    onChange={(value) => setAttributes({ button2Url: value })}
                />
            </div>
        </div>
    );
}