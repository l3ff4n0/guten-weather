import domReady from '@wordpress/dom-ready';
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { Panel, PanelBody, SelectControl,TextControl, ColorPalette, RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

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
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit(props) {

	const { attributes: { city, weatherType, numberDays, languageData, layoutModel, borderRadius, WidgetBgColor, WidgetColor }, setAttributes } = props;
	console.log(props);

	const onChangeCity = ( newCityName ) => {
		setAttributes( { city: newCityName } );

	};

	const onChangeWeatherType = ( newweatherType ) => {
		setAttributes( { weatherType: newweatherType } );
	};

	const onChangeNumberDays = ( newDay ) => {
		setAttributes( { numberDays: newDay } );
	};

	const onChangeLanguageData = ( newLanguageData ) => {
		setAttributes( { languageData: newLanguageData } );
	};

	const onChangeLayoutModel = ( newLayoutModel ) => {
		setAttributes( { layoutModel: newLayoutModel } );
	};

	const onChangeBorderRadius = ( newborderRadius ) => {
		setAttributes( { borderRadius: newborderRadius } );
	};

	const onChangeSetBgColor = (newBgColor) => {
		setAttributes ({ WidgetBgColor: newBgColor });
	};

	const onChangeSetColor = (newColor) => {
		setAttributes ({ WidgetColor: newColor });
	};

    const Backgroundcolors = [
        { name: 'White', color: '#fff' },
        { name: 'Black', color: '#000' },
        { name: 'Orange', color: '#FFA500' },
        { name: 'Pink Illusion', color: '#D0A7F5' },
        { name: 'Baby Blue Eyes', color: '#AFC6F5' },
        { name: 'Rose Bonbon', color: '#F542A3' },
        { name: 'Fuchsia Red', color: '#A83674' },
        { name: 'Pastel Maybe Maui', color: '#F5D38C' },
        { name: 'Machine Green', color: '#9EA83E' },
        { name: 'Python Blue', color: '#387CA9' },
        { name: 'California Poppy', color: '#A83F3E' },
        { name: 'Pastel Pale Pear', color: '#F4D66C' },
    ];

	const colors = [
        { name: 'White', color: '#fff' },
        { name: 'Black', color: '#000' },
        { name: 'Soulstone Blue', color: '#0049A6' },
        { name: 'Lush Greenery', color: '#E3ED39' },
        { name: 'Pastel Triforce Yellow', color: '#E6F20A' },
        { name: 'Free Speech Green', color: '#12F20A' },
        { name: 'Aquamentus Green', color: '#06A600' },
        { name: 'Y7 K Blue', color: '#0A5CF2' },
        { name: 'Electric Violet', color: '#8E0AF2' },
        { name: 'Cheddar', color: '#F2930A' },
        { name: 'Mike Wazowski Green', color: '#0AF253' },
        { name: 'Rich Blue', color: '#0A1FF2' },
    ];
	
	return (
		<div{ ...useBlockProps() }>
			<InspectorControls key="setting">
				<PanelBody title={ __( 'Guten weather settings', 'guten-weather' ) }>	
				<fieldset>
					<legend className="blocks-base-control__label">
						{ __( 'City', 'guten-weather' ) }
					</legend>
					<TextControl
						label="Write the name of your city"
						value={ city }
						onChange={ onChangeCity }
					/>
				</fieldset>
				<fieldset>
					<legend className="blocks-base-control__label">
						{ __( 'Weather type', 'guten-weather' ) }
					</legend>
					<SelectControl
						label="Select the weather type"
						value={ weatherType }
						options={
							[
								{ label: 'Current', value: 'current' },
								{ label: 'Forecast', value: 'forecast' },
							] }
						onChange={ onChangeWeatherType }
					/>
				</fieldset>
				<fieldset>
					<legend className="blocks-base-control__label">
						{ __( 'Number of days of weather forecast', 'guten-weather' ) }
					</legend>
					<SelectControl
						label=" Select the number of days"
						value={ numberDays }
						options={
							[
								{ label: '1', value: '1' },
								{ label: '2', value: '2' },
								{ label: '3', value: '3' },
								{ label: '4', value: '4' },
								{ label: '5', value: '5' },
								{ label: '6', value: '6' },
								{ label: '7', value: '7' },
								{ label: '8', value: '8' },
								{ label: '9', value: '9' },
								{ label: '10', value: '10' },
							] }
						onChange={ onChangeNumberDays }
					/>
				</fieldset>
				<fieldset>
					<legend className="blocks-base-control__label">
						{ __( 'Language data', 'guten-weather' ) }
					</legend>
					<SelectControl
						label="Choose the language"
						value={ languageData }
						options={
							[
								{ label: 'Select your language', value: 'select your language' },
								{ label: 'Arabic', value: 'ar' },
								{ label: 'Bengali', value: 'bn' },
								{ label: 'Bulgarian', value: 'bg' },
								{ label: 'Chinese Simplified', value: 'zh' },
								{ label: 'Chinese Traditional', value: 'zh_tw' },
								{ label: 'Czech', value: 'cs' },
								{ label: 'Danish', value: 'da' },
								{ label: 'Dutch', value: 'nl' },
								{ label: 'Finnish', value: 'fi' },
								{ label: 'French', value: 'fr' },
								{ label: 'German', value: 'de' },
								{ label: 'Greek', value: 'el' },
								{ label: 'Hindi', value: 'hi' },
								{ label: 'Hungarian', value: 'hu' },
								{ label: 'Italian', value: 'it' },
								{ label: 'Japanese', value: 'ja' },
								{ label: 'Javanese', value: 'jv' },
								{ label: 'Korean', value: 'ko' },
								{ label: 'Mandarin', value: 'zh_cmn' },
								{ label: 'Marathi', value: 'mr' },
								{ label: 'Polish', value: 'pl' },
								{ label: 'Portuguese', value: 'pt' },
								{ label: 'Punjabi', value: 'pa' },
								{ label: 'Romanian', value: 'ro' },
								{ label: 'Russian', value: 'ru' },
								{ label: 'Serbian', value: 'sr' },
								{ label: 'Sinhalese', value: 'si' },
								{ label: 'Slovak', value: 'sk' },
								{ label: 'Spanish', value: 'es' },
								{ label: 'Swedish', value: 'sv' },
								{ label: 'Tamil', value: 'ta' },
								{ label: 'Telugu', value: 'te' },
								{ label: 'Turkish', value: 'tr' },
								{ label: 'Ukrainian', value: 'uk' },
								{ label: 'Urdu', value: 'ur' },
								{ label: 'Vietnamese', value: 'vi' },
								{ label: 'Wu (Shanghainese)', value: 'zh_wuu' },
								{ label: 'Xiang', value: 'zh_hsn' },
								{ label: 'Yue (Cantonese)', value: 'zh_yue' },
								{ label: 'Zulu', value: 'zu' },
							] }
						onChange={ onChangeLanguageData }
					/>
				</fieldset>
				<fieldset>
					<legend className="blocks-base-control__label">
							{ __( 'Layout weather', 'guten-weather' ) }
					</legend>
					<SelectControl
						label="Choose your layout"
						value={layoutModel}
						options={
							[
								{ label: 'Select your layout', value: 'select_your_layout', },
								{ label: 'Static icons', value: 'static_icons', },
								{ label: 'Animated icons', value: 'animated_icons', },
							]
						}
						onChange={onChangeLayoutModel}
						/>
				</fieldset>
				<fieldset>
					<legend className="blocks-base-control__label">
							{ __( 'Border radius', 'guten-weather' ) }
					</legend>
					<RangeControl
						label="Choose your border radius"
						value={ borderRadius }
						onChange={ onChangeBorderRadius }
						initialPosition={0}
						min={ 0 }
						max={ 30 }
						step={ 5 }
					/>
				</fieldset>
				<fieldset>
					<legend className="blocks-base-control__label">
							{ __( 'Background color', 'guten-weather' ) }
					</legend>
					<ColorPalette
						colors={ Backgroundcolors }
						value={ WidgetBgColor }
						enableAlpha="true"
						onChange={onChangeSetBgColor}
					/>
				</fieldset>
				<fieldset>
					<legend className="blocks-base-control__label">
							{ __( 'Color', 'guten-weather' ) }
					</legend>
					<ColorPalette
						colors={ colors }
						value={ WidgetColor }
						enableAlpha="true"
						onChange={ onChangeSetColor }
					/>
				</fieldset>
				</PanelBody>
			</InspectorControls>
			<ServerSideRender block="guten-weather/guten-weather" attributes={ props.attributes } className="widget-weather-container" />
		</div>
	);
}
