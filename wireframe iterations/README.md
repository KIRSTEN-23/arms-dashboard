# ARMS Dashboard — wireframe iterations

Created 21 October; extended 22 October 2026. Browse **contact-sheet.png** for the full sequence, or use the files in **png/** and **svg/** directly.

## Deliverables

- **13 greyscale wireframe stages**: early map concept; income-only snapshot; two-object comparison plan; first Timeline plan; original page hierarchy; early statistical comparison; dedicated Timeline; layered-metric experiment; single-metric/matrix experiment; detailed Overview statements; toolbar/range filtering; persistent sidebar filtering; mobile restructuring.
- **3 higher-fidelity colour studies**: branded Overview; light Comparison controls; dark Comparison controls.
- Each PNG is **2880 × 2000** (2× a 1440 × 1000 artboard). SVGs are editable, scalable vector originals.
- Filenames order the stages; the notes below explain the main decisions and challenges.

## Evidence and historical accuracy

These are **retrospective visual reconstructions**, not historical screenshots. Do not present them as captured production screens or attach invented dates to individual experiments.

The first three stages are informed by Git history:

- `5911694`: Overview components and initial hierarchy.
- `d0d2e9b`: shared controls/filter panel and early Comparison composition.
- `16ae0ff`: dedicated Timeline components.

Later stages reconstruct experiments explicitly discussed in this conversation: all-metric layering, matrix/heatmap exploration, one-metric comparison, table transposition, toolbar vs sidebar, mobile structure, joined KPIs and colour application. The matrix and layered examples are intentionally labelled experiments rather than final recommendations.

The colour studies show selected decisions, not every transient tweak. The current photographic backdrop is abstracted to keep assets offline and isolate colour application. Typography uses a portable sans-serif instead of depending on downloaded webfonts. Colour studies therefore represent the chosen hierarchy, layout and palette; they are not pixel-identical captures of the running application.

## Tonal treatment

Greys are computed from each colour's **linear-light relative luminance**, using the sRGB transfer function and luminance weights 0.2126 / 0.7152 / 0.0722. This preserves the approximate tonal hierarchy of dark navigation, green headers, chart series, pale cards and accent controls. Image regions have the familiar crossed wireframe placeholder treatment. Charts remain simplified diagrams, rather than being replaced with image placeholders.

## Data

Chart shapes communicate structure. They are not live USDA exports. Numeric examples are explicitly illustrative, except the Comparison example values transcribed from the supplied screenshot. Do not use these artifacts as statistical evidence. Early placeholder content is retained only to document the problem that later configuration work addressed.

## Major process stories

1. **Define the comparison task.** Move from displaying competing statistics and layering many metrics to comparing one selected financial measure across farm groups. Keep Median/RSE as optional supporting detail.
2. **Test chart roles.** Explore radar, concentric donuts and matrix views; distinguish object comparison from time-series analysis. Negative values limit donut/polar suitability.
3. **Clarify Overview information hierarchy.** Separate high-level KPIs from detailed report breakdowns; reports can contain multiple financial measures. Avoid unverified decorative progress scores.
4. **Evolve filter placement.** Offcanvas → sidebar → visible toolbar; retain a layout switch. Apply pending edits deliberately to reduce unnecessary API requests. Limit years to the latest ten API-provided years.
5. **Restructure for mobile.** Use hamburger navigation, offcanvas filters, 2×2 KPIs, vertical bars and stacked table rows. Prevent overflow rather than shrinking desktop content indiscriminately.
6. **Refine the brand application.** Explore green shade differentiation and light versus translucent dark filter surfaces, keeping the bright accent for actions rather than data series.

The real API timeouts, request duplication and sidebar scrolling issues are documented in these notes where relevant; these wireframes do not claim to reproduce a runtime failure screenshot.

## Artifact format

This folder keeps the exported PNGs and editable SVGs. The optional HTML gallery and generation scripts are no longer included. No application dependencies are needed to view the images.

## Earlier planning evidence

The four `00a`–`00d` sheets extend the narrative into the initial June planning. They are grounded in *Project Planning and Dashboard.txt* (27 June 2026 messages) and the [API research and planning document](https://docs.google.com/document/d/1NP0m2HlDE_Rzz7xuD7frIt9zHbqtR7tqpMixyraywIY/edit). The latter records the choice of ARMS after researching traffic and football APIs. These sources contain discussion and proposed layouts, not all original visual attachments. The geographic Overview was considered, not implemented. The first Timeline includes proposed insights, not verified findings. Source dates date the discussion, not the creation of these reconstructed images.

Read the sequence as **scope → page roles → comparison experiments → filter interaction → responsive structure → colour application**. The three colour studies are unchanged. The assessment brief informs documentation coverage; unrelated authentication, SQL and ERD requirements are excluded.
