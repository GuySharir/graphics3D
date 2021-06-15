/*
 *   Created by Ligal Levy & Shaked Zrihen
 */

const paint = new Paint(new Toolbar());
paint.init();

// Shapes
paint.toolbar.addProjections(new OrtBtn("ortBtn", paint));
paint.toolbar.addProjections(new OblBtn("oblBtn", paint));
paint.toolbar.addProjections(new PresBtn("presBtn", paint));

// Transformation
paint.toolbar.addButton(new ScaleBtn("scaleBtn", paint));
paint.toolbar.addButton(new RotateBtn("rotateBtn", paint, "x"));
paint.toolbar.addButton(new RotateBtn("rotateYBtn", paint, "y"));
paint.toolbar.addButton(new RotateBtn("rotateZBtn", paint, "z"));

// paint.toolbar.addButton(new FitBtn("fitBtn", paint));

// Settings
paint.toolbar.addButton(new ImportBtn("importBtn", paint));
