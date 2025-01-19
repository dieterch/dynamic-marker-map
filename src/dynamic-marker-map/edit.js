/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	Button,
	ToggleControl
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
	const { mapImageUrl, markerIconUrl, locations = [] } = attributes;
	const [addMarkerEnabled, setAddMarkerEnabled] = React.useState(false); // Toggle state

	const addLocation = (top, left) => {
		setAttributes({
			locations: [...locations, { top: `${top}%`, left: `${left}%`, url: '', tooltip: '' }],
		});
	};

	const updateLocation = (index, key, value) => {
		const updatedLocations = [...locations];
		updatedLocations[index][key] = value;
		setAttributes({ locations: updatedLocations });
	};

	const removeLocation = (index) => {
		const updatedLocations = locations.filter((_, i) => i !== index);
		setAttributes({ locations: updatedLocations });
	};

	const handleMapClick = (e) => {
		if (!addMarkerEnabled) return; // Only add marker if toggle is enabled

		const mapContainer = e.target.closest('.map-container');
		if (!mapContainer) return;

		const rect = mapContainer.getBoundingClientRect();
		const top = ((e.clientY - rect.top) / rect.height) * 100;
		const left = ((e.clientX - rect.left) / rect.width) * 100;

		addLocation(top.toFixed(2), left.toFixed(2));
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Map Settings', 'dynamic-marker-map')}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ mapImageUrl: media.url })}
							allowedTypes={['image']}
							render={({ open }) => (
								<div>
									<Button onClick={open} isPrimary>
										{__('Select Map Image', 'dynamic-marker-map')}
									</Button>
									{mapImageUrl && (
										<img
											src={mapImageUrl}
											alt={__('Map Image', 'dynamic-marker-map')}
											style={{ width: '100%', marginTop: '10px' }}
										/>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ markerIconUrl: media.url })}
							allowedTypes={['image']}
							render={({ open }) => (
								<div style={{ alignItems: 'center', display: 'flex', marginTop: '20px' }}>
									<Button onClick={open} isPrimary>
										{__('Select Marker Image', 'dynamic-marker-map')}
									</Button>
									{markerIconUrl && (
										<img
											src={markerIconUrl}
											alt={__('Marker Image', 'dynamic-marker-map')}
											style={{ width: '24px', marginLeft: '10px' }}
										/>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody title={__('Add Marker by Click', 'dynamic-marker-map')}>
					<ToggleControl
						label={__('Enable Add Marker by Click', 'dynamic-marker-map')}
						checked={addMarkerEnabled}
						onChange={() => setAddMarkerEnabled(!addMarkerEnabled)}
					/>
				</PanelBody>
				<PanelBody title={__('Locations', 'dynamic-marker-map')}>
					{locations.map((location, index) => (
						<div key={index} style={{ marginTop: '15px', padding: '10px', border: '1px solid #ccc' }}>
							<TextControl
								label={__('Top Position (%)', 'dynamic-marker-map')}
								value={location.top}
								onChange={(value) => updateLocation(index, 'top', value)}
							/>
							<TextControl
								label={__('Left Position (%)', 'dynamic-marker-map')}
								value={location.left}
								onChange={(value) => updateLocation(index, 'left', value)}
							/>
							<TextControl
								label={__('URL', 'dynamic-marker-map')}
								value={location.url}
								onChange={(value) => updateLocation(index, 'url', value)}
							/>
							<TextControl
								label={__('Tooltip', 'dynamic-marker-map')}
								value={location.tooltip}
								onChange={(value) => updateLocation(index, 'tooltip', value)}
							/>
							<Button
								onClick={() => removeLocation(index)}
								isDestructive
								style={{ marginTop: '10px' }}
							>
								{__('Remove Marker', 'dynamic-marker-map')}
							</Button>
						</div>
					))}
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<div className="map-container" onClick={handleMapClick} style={{ position: 'relative' }}>
					{mapImageUrl && <img src={mapImageUrl} alt="Map" style={{ width: '100%' }} />}
					<div className="markers">
						{locations.map((location, index) => (
							<div
								key={index}
								className="marker"
								style={{
									position: 'absolute',
									top: location.top,
									left: location.left,
									backgroundImage: `url(${markerIconUrl})`,
									width: '24px',
									height: '24px',
									backgroundSize: 'cover',
									transform: 'translate(-50%, -50%)',
								}}
							>
								<span className="tooltip">{location.tooltip}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

