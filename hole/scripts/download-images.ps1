# Create necessary directories
$imageDir = "..\assets\images"
New-Item -ItemType Directory -Force -Path $imageDir

# Function to download image
function Download-Image {
    param (
        [string]$Url,
        [string]$FilePath
    )
    
    try {
        Invoke-WebRequest -Uri $Url -OutFile $FilePath
        Write-Host "Downloaded: $FilePath"
    } catch {
        Write-Host "Failed to download: $Url"
    }
}

# Placeholder image URLs (using Unsplash for high-quality free images)
$images = @{
    "hero-bg.jpg" = "https://source.unsplash.com/1600x900/?luxury,golf,resort"
    "logo.png" = "https://via.placeholder.com/150x50/ffffff/000000?text=Hole+Resort"
    "sea-view.jpg" = "https://source.unsplash.com/800x800/?sea,view,luxury"
    "golf-view.jpg" = "https://source.unsplash.com/800x800/?golf,course"
    "family.jpg" = "https://source.unsplash.com/800x800/?family,resort"
    "spa.jpg" = "https://source.unsplash.com/800x800/?spa,luxury"
    "luxury.jpg" = "https://source.unsplash.com/800x800/?luxury,hotel"
    "dest-1.jpg" = "https://source.unsplash.com/800x600/?riyadh,saudi"
    "dest-2.jpg" = "https://source.unsplash.com/800x600/?jeddah,saudi"
    "dest-3.jpg" = "https://source.unsplash.com/800x600/?dammam,saudi"
    "deal-1.jpg" = "https://source.unsplash.com/800x600/?hotel,luxury"
    "package-1.jpg" = "https://source.unsplash.com/800x600/?golf,resort"
    "package-2.jpg" = "https://source.unsplash.com/800x600/?family,vacation"
    "package-3.jpg" = "https://source.unsplash.com/800x600/?business,hotel"
    "app-preview.png" = "https://via.placeholder.com/300x600/ffffff/000000?text=App+Preview"
    "qr-code.png" = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://hole-resort.com/app"
}

# Download all images
foreach ($image in $images.GetEnumerator()) {
    $filePath = Join-Path $imageDir $image.Key
    Download-Image -Url $image.Value -FilePath $filePath
}

Write-Host "Image download complete!"
