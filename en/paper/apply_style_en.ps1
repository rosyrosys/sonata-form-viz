# Apply English academic styling (international journal submission style)
# - Times New Roman 12pt body, double-spaced, A4, 2.54cm margins
# - Most international journals require double-spacing for initial submission;
#   change LineSpacingRule to 4 (1.5x) if the target journal explicitly asks for 1.5
$ErrorActionPreference = 'Stop'
$path = 'C:\Users\drros\OneDrive\Desktop\TISMIR\paper\paper_en.docx'

$bodyFont = 'Times New Roman'
$headingFont = 'Times New Roman'
$monoFont = 'Consolas'

$wdStyleNormal   = -1
$wdStyleHeading1 = -2
$wdStyleHeading2 = -3
$wdStyleHeading3 = -4
$wdStyleHeading4 = -5
$wdStyleTitle    = -63

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    $doc = $word.Documents.Open($path)

    # ----- 페이지: A4, 1 inch (2.54 cm) -----
    $ps = $doc.PageSetup
    $ps.PaperSize = 7
    $cm = 28.3464567
    $ps.TopMargin    = 2.54 * $cm
    $ps.BottomMargin = 2.54 * $cm
    $ps.LeftMargin   = 2.54 * $cm
    $ps.RightMargin  = 2.54 * $cm

    # ----- Normal: Times New Roman 12, double-spaced -----
    $normal = $doc.Styles.Item($wdStyleNormal)
    $normal.Font.Name        = $bodyFont
    try { $normal.Font.NameFarEast = $bodyFont } catch {}
    $normal.Font.Size        = 12
    $normal.ParagraphFormat.LineSpacingRule = 5    # wdLineSpaceMultiple
    $normal.ParagraphFormat.LineSpacing      = 24  # 200% = double for 12pt
    $normal.ParagraphFormat.SpaceAfter       = 0
    $normal.ParagraphFormat.FirstLineIndent  = 0

    # ----- Heading -----
    function Set-Hd($id, $size) {
        try {
            $s = $doc.Styles.Item($id)
            $s.Font.Name        = $headingFont
            try { $s.Font.NameFarEast = $headingFont } catch {}
            $s.Font.Size        = $size
            $s.Font.Bold        = $true
            $s.Font.Color       = 0
            $s.ParagraphFormat.LineSpacingRule = 5
            $s.ParagraphFormat.LineSpacing     = 24
            $s.ParagraphFormat.SpaceBefore     = 18
            $s.ParagraphFormat.SpaceAfter      = 6
            $s.ParagraphFormat.KeepWithNext    = $true
        } catch {}
    }
    Set-Hd $wdStyleHeading1 14
    Set-Hd $wdStyleHeading2 12
    Set-Hd $wdStyleHeading3 12
    Set-Hd $wdStyleHeading4 12
    Set-Hd $wdStyleTitle    18

    # ----- Code blocks -----
    foreach ($n in @("Source Code", "Verbatim Char", "Code", "HTML Code")) {
        try {
            $s = $doc.Styles.Item($n)
            $s.Font.Name        = $monoFont
            try { $s.Font.NameFarEast = $monoFont } catch {}
            $s.Font.Size        = 10
            if ($s.Type -eq 1) {
                $s.ParagraphFormat.LeftIndent      = $cm * 0.5
                $s.ParagraphFormat.LineSpacingRule = 0   # single
                $s.ParagraphFormat.SpaceBefore     = 6
                $s.ParagraphFormat.SpaceAfter      = 6
                $s.Shading.BackgroundPatternColor  = 15791615
            }
        } catch {}
    }

    # ----- Tables -----
    foreach ($t in $doc.Tables) {
        try {
            $t.Rows.Alignment    = 1
            $t.PreferredWidthType = 1
            $t.AutoFitBehavior(1)
            $t.Range.Font.Name   = $bodyFont
            $t.Range.Font.Size   = 11
            $t.Range.ParagraphFormat.LineSpacingRule = 0   # tables: single
            if ($t.Rows.Count -gt 0) {
                $t.Rows.Item(1).Range.Font.Bold = $true
                $t.Rows.Item(1).Range.Shading.BackgroundPatternColor = 15461355
            }
        } catch {}
    }

    # ----- Page numbers -----
    $section = $doc.Sections.Item(1)
    $footer  = $section.Footers.Item(1)
    $footer.PageNumbers.Add(2, $false) | Out-Null

    # ----- 라인 번호 (line numbers) — 학술지 심사용 -----
    $ps.LineNumbering.Active   = $true
    $ps.LineNumbering.StartingNumber = 1
    $ps.LineNumbering.CountBy  = 1
    $ps.LineNumbering.RestartMode = 0   # wdRestartContinuous

    $doc.Save()
    $doc.Close()
    Write-Output "Saved with English-academic styling (TNR 12, double-spaced, A4, line numbers)."
} finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}
