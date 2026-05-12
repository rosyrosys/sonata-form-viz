# Apply Korean academic styling to paper_ko.docx via Word COM
$ErrorActionPreference = 'Stop'
$path = 'C:\Users\drros\OneDrive\Desktop\TISMIR\paper\paper_ko.docx'

# Detect installed Korean fonts
Add-Type -AssemblyName System.Drawing
$fonts = (New-Object System.Drawing.Text.InstalledFontCollection).Families | ForEach-Object { $_.Name }
$bodyFont = if ($fonts -contains '함초롬바탕') { '함초롬바탕' }
            elseif ($fonts -contains 'HY신명조') { 'HY신명조' }
            elseif ($fonts -contains '바탕') { '바탕' }
            else { '맑은 고딕' }
$headingFont = if ($fonts -contains '함초롬돋움') { '함초롬돋움' }
               elseif ($fonts -contains '맑은 고딕') { '맑은 고딕' }
               else { 'Malgun Gothic' }
$latinFont = 'Times New Roman'
$monoFont  = 'Consolas'

Write-Output ("Body font: " + $bodyFont)
Write-Output ("Heading font: " + $headingFont)

# Word built-in style constants
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

    # ----- 페이지 설정: A4, 여백 2.5cm -----
    $ps = $doc.PageSetup
    $ps.PaperSize = 7   # wdPaperA4
    $cm = 28.3464567
    $ps.TopMargin    = 2.5 * $cm
    $ps.BottomMargin = 2.5 * $cm
    $ps.LeftMargin   = 2.5 * $cm
    $ps.RightMargin  = 2.5 * $cm

    # ----- Normal -----
    $normal = $doc.Styles.Item($wdStyleNormal)
    $normal.Font.Name        = $latinFont
    $normal.Font.NameFarEast = $bodyFont
    $normal.Font.Size        = 11
    $normal.ParagraphFormat.LineSpacingRule = 4   # wdLineSpace1pt5
    $normal.ParagraphFormat.SpaceAfter      = 6
    $normal.ParagraphFormat.FirstLineIndent = 0

    # ----- Heading 스타일 함수 -----
    function Set-Hd($styleId, $size) {
        try {
            $s = $doc.Styles.Item($styleId)
            $s.Font.Name        = $latinFont
            $s.Font.NameFarEast = $headingFont
            $s.Font.Size        = $size
            $s.Font.Bold        = $true
            $s.Font.Color       = 0
            $s.ParagraphFormat.LineSpacingRule = 4
            $s.ParagraphFormat.SpaceBefore     = 18
            $s.ParagraphFormat.SpaceAfter      = 6
            $s.ParagraphFormat.KeepWithNext    = $true
        } catch {
            Write-Output ("Heading style id " + $styleId + " not found")
        }
    }
    Set-Hd $wdStyleHeading1 16
    Set-Hd $wdStyleHeading2 13
    Set-Hd $wdStyleHeading3 12
    Set-Hd $wdStyleHeading4 11
    Set-Hd $wdStyleTitle    20

    # ----- 코드 블록 (이름 검색) -----
    $codeStyleNames = @("Source Code", "Verbatim Char", "Code", "코드 블록")
    foreach ($n in $codeStyleNames) {
        try {
            $s = $doc.Styles.Item($n)
            $s.Font.Name        = $monoFont
            $s.Font.NameFarEast = $monoFont
            $s.Font.Size        = 9.5
            if ($s.Type -eq 1) {
                $s.ParagraphFormat.LeftIndent       = $cm * 0.5
                $s.ParagraphFormat.LineSpacingRule  = 0
                $s.ParagraphFormat.SpaceBefore      = 6
                $s.ParagraphFormat.SpaceAfter       = 6
                $s.Shading.BackgroundPatternColor   = 15791615
            }
        } catch {}
    }

    # ----- 테이블 -----
    foreach ($t in $doc.Tables) {
        try {
            $t.Rows.Alignment    = 1
            $t.PreferredWidthType = 1
            $t.AutoFitBehavior(1)
            $t.Range.Font.Size        = 10
            $t.Range.Font.Name        = $latinFont
            $t.Range.Font.NameFarEast = $bodyFont
            if ($t.Rows.Count -gt 0) {
                $t.Rows.Item(1).Range.Font.Bold = $true
                $t.Rows.Item(1).Range.Shading.BackgroundPatternColor = 15461355
            }
        } catch {}
    }

    # ----- 페이지 번호 (footer 가운데) -----
    $section = $doc.Sections.Item(1)
    $footer  = $section.Footers.Item(1)
    $footer.PageNumbers.Add(2, $false) | Out-Null

    # ----- 본문 단락의 동아시아 폰트 정리 -----
    foreach ($p in $doc.Paragraphs) {
        try {
            $sn = $p.Range.Style.NameLocal
            if ($sn -notmatch "Heading|제목|코드|Code|Source") {
                $p.Range.Font.NameFarEast = $bodyFont
            }
        } catch {}
    }

    $doc.Save()
    $doc.Close()
    Write-Output "Saved with academic styling."
} finally {
    $word.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
}
