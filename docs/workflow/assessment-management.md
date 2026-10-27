# Assessment Management

Manages assessments, creates test batteries, and provides access to Job Fit Profile (JFP).

## View Assessments

List of assessments available in a grid card gallery.

### Search

Searches the visible assessment cards.

#### Access Path

- `Assessments` > `View Assessments` > `Search Input`

#### How To Use

1. Open `View Assessments`.
2. Enter search text.
3. Submit the search.

> Expected Result:
> - Assessment cards matching the search text are displayed.

### Advanced Search

Searches assessments using configured rules.

#### Access Path

- `Assessments` > `View Assessments` > `Advanced Search`

#### How To Use

1. Open `View Assessments`.
2. Open `Advanced Search`.
3. Add or remove search rules.
4. Select `Search`.

> Expected Result:
> - Assessment cards matching the configured rules are displayed.

### Filter By Category

Restricts the assessment gallery to a selected category.

#### Access Path

- `Assessments` > `View Assessments` > `Filter By Category`

#### How To Use

1. Open `View Assessments`.
2. Open `Filter By Category`.
3. Select a category.

> Expected Result:
> - Only assessment cards in the selected category are displayed.

### Filter By Codes

Restricts the assessment gallery using a selected assessment code.

#### Access Path

- `Assessments` > `View Assessments` > `Filter By Codes`

#### How To Use

1. Open `View Assessments`.
2. Open `Filter By Codes`.
3. Select the applicable code.

> Expected Result:
> - Only assessment cards matching the selected code are displayed.

### Sort

Orders assessment cards using a selected field.

#### Access Path

- `Assessments` > `View Assessments` > `Sort`

#### How To Use

1. Open `View Assessments`.
2. Open `Sort`.
3. Select a sort field.

> Expected Result:
> - Assessment cards are reordered using the selected field.

### Sort By Ascending or Descending

Controls the direction applied to the selected sort field.

#### Access Path

- `Assessments` > `View Assessments` > `Sort Direction`

#### How To Use

1. Select a sort field.
2. Select ascending or descending order.

> Expected Result:
> - Assessment cards are displayed in the selected direction.

### View specific Assessment

View Assessment Informations: Description, Dimension, Number of Items, Time Limit, Test Norms, Recommended Level and/or etc.

#### Access Path

- `Assessments` > `View Assessments` > `Assessment Card`

#### How To Use

1. Open `View Assessments`.
2. Select an assessment card.

#### Preview Assessment

> Expected Result:
> - The preview displays the custom description provided by the assessment provider, including the description, dimensions, number of items, time limit, test norm, recommended level, and available test norms.
> - For a test battery, the preview also lists the assessments included in the battery.

#### Upload Norm

> Notes:
> - The Upload Norm page is under construction and will be added soon. Its link is not yet available.

#### Config Dropdown

##### Page Setup

Configures the page setup for the selected assessment.

###### Access Path

- `Assessments` > `View Assessments` > `Assessment Card` > `Config Dropdown` > `Page Setup`

###### How To Use

1. Configure Assessment with the following:
   - Progress bar
   - Randomize toggle
   - Timer Setup

##### Set Questions

Modify assessment questions and other configurations.

###### Access Path

- `Assessments` > `View Assessments` > `Assessment Card` > `Config Dropdown` > `Set Questions`

###### How To Use

1. Modify questions individually by question number.
2. Select `Save` to save the changes.

##### Set Report Template

Configures assessment information and assessment development.

###### Access Path

- `Assessments` > `View Assessments` > `Assessment Card` > `Config Dropdown` > `Set Report Template`

###### How To Use

1. Assessment Information
   - Name
   - Description
   - Meter Deduction
   - Assessment Category
   - Status
2. Assessment Development
   - Report Template
   - Amified toggle
   - Re-upload Assessment import file
   - Upload Icon
   - Report Types
   - Category and Competency
   - IRT Initial Ability Types
   - DevNote

##### Debug Mode

Preview test instructions, item rendering, and candidate view in Debug Mode.

###### Access Path

- `Assessments` > `View Assessments` > `Assessment Card` > `Config Dropdown` > `Debug Mode`

> Expected Result:
> - Debug Mode displays the custom description provided by the assessment provider, including the description, dimensions, number of items, time limit, test norm, recommended level, and available test norms.
> - For a test battery, Debug Mode also lists the assessments included in the battery.

#### Settings Dropdown

##### Update

Updates assessment information and assessment development using the same configuration as Set Report Template.

###### Access Path

- `Assessments` > `View Assessments` > `Assessment Card` > `Settings Dropdown` > `Update`

###### How To Use

1. Assessment Information
   - Name
   - Description
   - Meter Deduction
   - Assessment Category
   - Status
2. Assessment Development
   - Report Template
   - Amified toggle
   - Re-upload Assessment import file
   - Upload Icon
   - Report Types
   - Category and Competency
   - IRT Initial Ability Types
   - DevNote

##### Export Assessment

Exports the assessment as an XLSX file using the assessment template format.

> Expected Result:
> - An XLSX file is downloaded for the user.

##### View Scheduled Candidates

Lists candidates scheduled for the selected assessment.

###### Access Path

- `Assessments` > `View Assessments` > `Assessment Card` > `Settings Dropdown` > `View Scheduled Candidates`

> Notes:
> - This action redirects to another page. The destination page is under construction and its link is not yet available in the manual.

##### Delete

Deletes the selected assessment.

###### Access Path

- `Assessments` > `View Assessments` > `Assessment Card` > `Settings Dropdown` > `Delete`

###### How To Use

1. Select an assessment.
2. Open `Settings Dropdown` and select `Delete`.
3. Confirm the deletion in the confirmation modal.

## Import Assessment

Upload an assessment.

### Access Path

- `Assessments` > `Import Assessment`

### How To Use

1. Open `Import Assessment`.
2. Select an assessment file based on the provided template.
3. Select `Import Assessment`.

### Download Template

#### Access Path

- `Assessments` > `Import Assessment` > `Download Template`

#### How To Use

1. Open `Import Assessment`.
2. Select `Download Template`.

## Create Test Battery

Create test battery assessments by combining multiple assessments.

### Assessment List

Displays assessments grouped by category, with checkboxes and assessment specifications. Other test batteries are excluded.

#### How To Use

1. Select at least two assessments using the checkboxes.
2. Select `Next` to move to Test Battery Configurations.

> Rules:
> - Select a minimum of two assessments.

### Test Battery Configurations

#### Required Inputs

- Name
- Status
- Meter Deduction
- Set Test Order and Passing Score

#### Optional Inputs

- Description

#### How To Use

1. Enter the test battery configuration.
2. Select `Save` to save the test battery, or select `Back` to return to Assessment List.

## Schedule Job Fit Profile

Access the Job Fit Profile Assessment subsystem.
